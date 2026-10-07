import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { defaultMembershipConfig, defaultTourConfig } from '@/lib/data';
import { MembershipConfig, TourConfig } from '@/lib/types';

let inMemoryMembership: MembershipConfig = { ...defaultMembershipConfig };
let inMemoryTour: TourConfig = { ...defaultTourConfig };

// GET /api/config?key=membership | tour
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  try {
    if (supabaseAdmin) {
      const { data } = await supabaseAdmin.from('site_config').select('*');
      if (data && data.length > 0) {
        const memRow = data.find((r: any) => r.key === 'membership_config');
        const tourRow = data.find((r: any) => r.key === 'tour_config');
        if (memRow) inMemoryMembership = memRow.value;
        if (tourRow) inMemoryTour = tourRow.value;
      }
    }
  } catch (err) {
    console.error('API GET Config error:', err);
  }

  if (key === 'membership') {
    return NextResponse.json({ membershipConfig: inMemoryMembership }, { status: 200 });
  }
  if (key === 'tour') {
    return NextResponse.json({ tourConfig: inMemoryTour }, { status: 200 });
  }

  return NextResponse.json(
    { membershipConfig: inMemoryMembership, tourConfig: inMemoryTour },
    { status: 200 }
  );
}

// POST /api/config (Updates membership or tour config)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (key === 'membership') {
      inMemoryMembership = value;
    } else if (key === 'tour') {
      inMemoryTour = value;
    }

    if (supabaseAdmin) {
      const configKey = key === 'membership' ? 'membership_config' : 'tour_config';
      await supabaseAdmin.from('site_config').upsert({
        key: configKey,
        value: value,
        updated_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true, key, value }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
