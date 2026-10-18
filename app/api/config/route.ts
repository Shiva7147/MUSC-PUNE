import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { defaultMembershipConfig, defaultTourConfig } from '@/lib/data';
import { MembershipConfig, TourConfig } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
        if (memRow && memRow.value && typeof memRow.value === 'object') {
          inMemoryMembership = {
            ...defaultMembershipConfig,
            ...memRow.value,
            sizePrices: {
              ...defaultMembershipConfig.sizePrices,
              ...(memRow.value.sizePrices || {}),
            },
          };
        }
        if (tourRow && tourRow.value && typeof tourRow.value === 'object') {
          inMemoryTour = {
            ...defaultTourConfig,
            ...tourRow.value,
          };
        }
      }
    }
  } catch (err) {
    console.error('API GET Config error:', err);
  }

  if (key === 'membership') {
    return NextResponse.json({ membership: inMemoryMembership, membershipConfig: inMemoryMembership }, { status: 200 });
  }
  if (key === 'tour') {
    return NextResponse.json({ tour: inMemoryTour, tourConfig: inMemoryTour }, { status: 200 });
  }

  return NextResponse.json(
    {
      membership: inMemoryMembership,
      membershipConfig: inMemoryMembership,
      tour: inMemoryTour,
      tourConfig: inMemoryTour,
    },
    { status: 200 }
  );
}

// POST /api/config (Updates membership or tour config)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    const isMembership = key === 'membership' || key === 'membership_config';
    const isTour = key === 'tour' || key === 'tour_config';

    if (isMembership) {
      inMemoryMembership = {
        ...defaultMembershipConfig,
        ...value,
        sizePrices: {
          ...defaultMembershipConfig.sizePrices,
          ...(value?.sizePrices || {}),
        },
      };

      if (supabaseAdmin) {
        await supabaseAdmin.from('site_config').upsert({
          key: 'membership_config',
          value: inMemoryMembership,
          updated_at: new Date().toISOString(),
        });
      }
    } else if (isTour) {
      inMemoryTour = {
        ...defaultTourConfig,
        ...value,
      };

      if (supabaseAdmin) {
        await supabaseAdmin.from('site_config').upsert({
          key: 'tour_config',
          value: inMemoryTour,
          updated_at: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({
      success: true,
      key,
      value: isMembership ? inMemoryMembership : inMemoryTour,
      membership: inMemoryMembership,
      tour: inMemoryTour,
    }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
