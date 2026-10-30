import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { upcomingScreenings } from '@/lib/data';
import { Screening } from '@/lib/types';
import { isSameMatch, sortScreeningsChronologically } from '@/lib/ticketStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

let inMemoryScreenings: Screening[] = sortScreeningsChronologically([...upcomingScreenings]);

// Helper to format Supabase DB row to Screening interface
const formatScreeningRow = (row: any, bookedSeats: number = 0, splitMap: Record<string, any> = {}): Screening => {
  const capacity = Number(row.capacity) || 250;
  const dbRemaining = row.remaining_seats !== null && row.remaining_seats !== undefined ? Number(row.remaining_seats) : capacity;
  // Dynamic remaining seats subtracts booked tickets
  const remainingSeats = Math.max(0, Math.min(dbRemaining, capacity - bookedSeats));

  const split = splitMap[row.id] || {};
  const firstPhase = Array.isArray(row.phases) && row.phases[0] ? row.phases[0] : null;

  const price = Number(row.price);
  const redeemableAmount = split.redeemableAmount !== undefined
    ? Number(split.redeemableAmount)
    : (firstPhase?.redeemableAmount !== undefined ? Number(firstPhase.redeemableAmount) : (price >= 400 ? price - 100 : (price === 350 ? 250 : undefined)));

  const entryFeeAmount = split.entryFeeAmount !== undefined
    ? Number(split.entryFeeAmount)
    : (firstPhase?.entryFeeAmount !== undefined ? Number(firstPhase.entryFeeAmount) : (redeemableAmount !== undefined ? Math.max(0, price - redeemableAmount) : undefined));

  const pricingSplitNotes = split.notes || firstPhase?.pricingSplitNotes || (redeemableAmount !== undefined ? `₹${redeemableAmount} Redeemable on F&B + ₹${entryFeeAmount} Entry Fee` : undefined);

  return {
    id: row.id,
    matchTitle: row.match_title,
    competition: row.competition,
    homeTeam: row.home_team,
    awayTeam: row.away_team,
    homeLogo: row.home_logo || '🔴',
    awayLogo: row.away_logo || '🔴',
    date: row.date,
    time: row.time,
    venueName: row.venue_name,
    venueAddress: row.venue_address || row.venue_name,
    venueArea: row.venue_area || 'Central Pune',
    price,
    redeemableAmount,
    entryFeeAmount,
    pricingSplitNotes,
    activePhaseName: row.active_phase_name,
    phases: row.phases || [],
    taxRate: row.tax_rate ? Number(row.tax_rate) : 0.18,
    platformFeeRate: (row.platform_fee ?? row.platform_fee_rate) ? Number(row.platform_fee ?? row.platform_fee_rate) : 0.03,
    platformFee: row.platform_fee ? Number(row.platform_fee) : 0.03,
    featured: Boolean(row.featured),
    status: remainingSeats === 0 ? 'SOLD_OUT' : (row.status || 'UPCOMING'),
    description: row.description || '',
    gateOpening: row.gate_opening || '07:30 PM IST',
    inclusions: row.inclusions || [],
    rules: row.rules || [],
    capacity,
    remainingSeats,
  };
};

// GET /api/screenings - Fetch all screenings (Reads from Supabase with dynamic ticket seat counts)
export async function GET() {
  try {
    if (supabaseAdmin) {
      const [screeningsRes, ticketsRes, splitsRes] = await Promise.all([
        supabaseAdmin.from('screenings').select('*'),
        supabaseAdmin.from('tickets').select('screening_id, match_title, quantity'),
        supabaseAdmin.from('site_config').select('value').eq('key', 'screening_pricing_splits').single(),
      ]);

      const ticketsData = ticketsRes.data || [];
      const splitMap = (splitsRes.data?.value && typeof splitsRes.data.value === 'object') ? splitsRes.data.value : {};

      if (!screeningsRes.error && screeningsRes.data && screeningsRes.data.length > 0) {
        inMemoryScreenings = screeningsRes.data.map((row: any) => {
          const bookedSeats = ticketsData
            .filter((t: any) => isSameMatch(t.match_title, row.match_title, t.screening_id, row.id))
            .reduce((sum: number, t: any) => sum + (Number(t.quantity) || 1), 0);

          return formatScreeningRow(row, bookedSeats, splitMap);
        });
        const sorted = sortScreeningsChronologically(inMemoryScreenings);
        return NextResponse.json({ screenings: sorted }, { status: 200 });
      } else {
        // Fallback when table has no custom rows yet
        const computed = inMemoryScreenings.map((sc) => {
          const bookedSeats = ticketsData
            .filter((t: any) => isSameMatch(t.match_title, sc.matchTitle, t.screening_id, sc.id))
            .reduce((sum: number, t: any) => sum + (Number(t.quantity) || 1), 0);
          const capacity = sc.capacity || 250;
          return {
            ...sc,
            remainingSeats: Math.max(0, capacity - bookedSeats),
          };
        });
        const sorted = sortScreeningsChronologically(computed);
        return NextResponse.json({ screenings: sorted }, { status: 200 });
      }
    }
  } catch (err) {
    console.error('API GET Screenings error:', err);
  }
  return NextResponse.json({ screenings: sortScreeningsChronologically(inMemoryScreenings) }, { status: 200 });
}

// POST /api/screenings - CREATE New Screening
export async function POST(request: Request) {
  try {
    const item: Screening = await request.json();
    inMemoryScreenings = [item, ...inMemoryScreenings.filter((s) => s.id !== item.id)];

    if (supabaseAdmin) {
      const updatedPhases = (item.phases && item.phases.length > 0)
        ? item.phases.map((p, idx) => idx === 0 ? { ...p, redeemableAmount: item.redeemableAmount, entryFeeAmount: item.entryFeeAmount } : p)
        : [{ phaseName: item.activePhaseName || 'PHASE 1', price: item.price, isActive: true, redeemableAmount: item.redeemableAmount, entryFeeAmount: item.entryFeeAmount }];

      const payload = {
        id: item.id,
        match_title: item.matchTitle,
        competition: item.competition || 'Premier League',
        home_team: item.homeTeam || 'Manchester United',
        away_team: item.awayTeam || 'Opponent',
        home_logo: item.homeLogo || '🔴',
        away_logo: item.awayLogo || '🔴',
        date: item.date,
        time: item.time,
        venue_name: item.venueName,
        venue_address: item.venueAddress || item.venueName,
        venue_area: item.venueArea || 'Central Pune',
        price: item.price,
        active_phase_name: item.activePhaseName || 'PHASE 1',
        phases: updatedPhases,
        tax_rate: item.taxRate ?? 0.18,
        platform_fee: item.platformFeeRate ?? item.platformFee ?? 0.03,
        featured: Boolean(item.featured),
        status: item.status || 'UPCOMING',
        description: item.description || '',
        gate_opening: item.gateOpening || '07:30 PM IST',
        inclusions: item.inclusions || [],
        rules: item.rules || [],
        capacity: item.capacity || 250,
        remaining_seats: item.remainingSeats ?? item.capacity ?? 250,
      };

      const { error } = await supabaseAdmin.from('screenings').upsert(payload);
      if (error) {
        console.error('Supabase screenings POST error:', error);
      }

      // Sync pricing split into site_config
      try {
        const { data: currentSplits } = await supabaseAdmin.from('site_config').select('value').eq('key', 'screening_pricing_splits').single();
        const splitObj = (currentSplits?.value && typeof currentSplits.value === 'object') ? currentSplits.value : {};
        splitObj[item.id] = {
          redeemableAmount: item.redeemableAmount,
          entryFeeAmount: item.entryFeeAmount,
          notes: item.pricingSplitNotes,
        };
        await supabaseAdmin.from('site_config').upsert({
          key: 'screening_pricing_splits',
          value: splitObj,
          updated_at: new Date().toISOString(),
        });
      } catch (splitErr) {
        console.error('Supabase screening pricing split sync error:', splitErr);
      }
    }

    return NextResponse.json({ success: true, screening: item }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/screenings - UPDATE Existing Screening
export async function PUT(request: Request) {
  try {
    const item: Screening = await request.json();
    inMemoryScreenings = inMemoryScreenings.map((s) => (s.id === item.id ? { ...s, ...item } : s));

    if (supabaseAdmin) {
      const updatedPhases = (item.phases && item.phases.length > 0)
        ? item.phases.map((p, idx) => idx === 0 ? { ...p, redeemableAmount: item.redeemableAmount, entryFeeAmount: item.entryFeeAmount } : p)
        : [{ phaseName: item.activePhaseName || 'PHASE 1', price: item.price, isActive: true, redeemableAmount: item.redeemableAmount, entryFeeAmount: item.entryFeeAmount }];

      const payload = {
        id: item.id,
        match_title: item.matchTitle,
        competition: item.competition || 'Premier League',
        home_team: item.homeTeam || 'Manchester United',
        away_team: item.awayTeam || 'Opponent',
        home_logo: item.homeLogo || '🔴',
        away_logo: item.awayLogo || '🔴',
        date: item.date,
        time: item.time,
        venue_name: item.venueName,
        venue_address: item.venueAddress || item.venueName,
        venue_area: item.venueArea || 'Central Pune',
        price: item.price,
        active_phase_name: item.activePhaseName || 'PHASE 1',
        phases: updatedPhases,
        tax_rate: item.taxRate ?? 0.18,
        platform_fee: item.platformFeeRate ?? item.platformFee ?? 0.03,
        featured: Boolean(item.featured),
        status: item.status || 'UPCOMING',
        description: item.description || '',
        gate_opening: item.gateOpening || '07:30 PM IST',
        inclusions: item.inclusions || [],
        rules: item.rules || [],
        capacity: item.capacity || 250,
        remaining_seats: item.remainingSeats ?? item.capacity ?? 250,
      };

      const { error } = await supabaseAdmin.from('screenings').upsert(payload);
      if (error) {
        console.error('Supabase screenings PUT error:', error);
      }

      // Sync pricing split into site_config
      try {
        const { data: currentSplits } = await supabaseAdmin.from('site_config').select('value').eq('key', 'screening_pricing_splits').single();
        const splitObj = (currentSplits?.value && typeof currentSplits.value === 'object') ? currentSplits.value : {};
        splitObj[item.id] = {
          redeemableAmount: item.redeemableAmount,
          entryFeeAmount: item.entryFeeAmount,
          notes: item.pricingSplitNotes,
        };
        await supabaseAdmin.from('site_config').upsert({
          key: 'screening_pricing_splits',
          value: splitObj,
          updated_at: new Date().toISOString(),
        });
      } catch (splitErr) {
        console.error('Supabase screening pricing split sync error:', splitErr);
      }
    }

    return NextResponse.json({ success: true, screening: item }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/screenings - DELETE Screening by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing screening ID' }, { status: 400 });
    }

    inMemoryScreenings = inMemoryScreenings.filter((s) => s.id !== id);

    if (supabaseAdmin) {
      await supabaseAdmin.from('screenings').delete().eq('id', id);
    }

    return NextResponse.json({ success: true, deletedId: id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
