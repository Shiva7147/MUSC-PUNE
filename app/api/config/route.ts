import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { defaultMembershipConfig, defaultTourConfig, defaultSiteTaxConfig } from '@/lib/data';
import { MembershipConfig, TourConfig, SiteTaxConfig } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

let inMemoryMembership: MembershipConfig = { ...defaultMembershipConfig };
let inMemoryTour: TourConfig = { ...defaultTourConfig };
let inMemoryTax: SiteTaxConfig = { ...defaultSiteTaxConfig };
let inMemoryOrders: any[] = [];

// GET /api/config?key=membership | tour | tax_config | product_orders
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  try {
    if (supabaseAdmin) {
      const { data } = await supabaseAdmin.from('site_config').select('*');
      if (data && data.length > 0) {
        const memRow = data.find((r: any) => r.key === 'membership_config');
        const tourRow = data.find((r: any) => r.key === 'tour_config');
        const taxRow = data.find((r: any) => r.key === 'tax_config');
        const ordersRow = data.find((r: any) => r.key === 'product_orders');
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
        if (taxRow && taxRow.value && typeof taxRow.value === 'object') {
          inMemoryTax = {
            ...defaultSiteTaxConfig,
            ...taxRow.value,
          };
        }
        if (ordersRow && Array.isArray(ordersRow.value)) {
          inMemoryOrders = ordersRow.value;
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
  if (key === 'tax_config' || key === 'tax') {
    return NextResponse.json({ taxConfig: inMemoryTax, tax_config: inMemoryTax }, { status: 200 });
  }
  if (key === 'product_orders' || key === 'orders') {
    return NextResponse.json({ product_orders: inMemoryOrders, productOrders: inMemoryOrders }, { status: 200 });
  }

  return NextResponse.json(
    {
      membership: inMemoryMembership,
      membershipConfig: inMemoryMembership,
      tour: inMemoryTour,
      tourConfig: inMemoryTour,
      taxConfig: inMemoryTax,
      tax_config: inMemoryTax,
      product_orders: inMemoryOrders,
      productOrders: inMemoryOrders,
    },
    { status: 200 }
  );
}

// POST /api/config (Updates membership, tour, tax config, or product orders)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    const isMembership = key === 'membership' || key === 'membership_config';
    const isTour = key === 'tour' || key === 'tour_config';
    const isTax = key === 'tax' || key === 'tax_config';
    const isOrders = key === 'product_orders' || key === 'orders';

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
    } else if (isTax) {
      inMemoryTax = {
        ...defaultSiteTaxConfig,
        ...value,
      };

      if (supabaseAdmin) {
        await supabaseAdmin.from('site_config').upsert({
          key: 'tax_config',
          value: inMemoryTax,
          updated_at: new Date().toISOString(),
        });
      }
    } else if (isOrders) {
      inMemoryOrders = Array.isArray(value) ? value : [];
      if (supabaseAdmin) {
        await supabaseAdmin.from('site_config').upsert({
          key: 'product_orders',
          value: inMemoryOrders,
          updated_at: new Date().toISOString(),
        });
      }
    } else if (key && value !== undefined) {
      if (supabaseAdmin) {
        await supabaseAdmin.from('site_config').upsert({
          key,
          value,
          updated_at: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({
      success: true,
      key,
      value,
      membership: inMemoryMembership,
      tour: inMemoryTour,
      taxConfig: inMemoryTax,
      tax_config: inMemoryTax,
      product_orders: inMemoryOrders,
      productOrders: inMemoryOrders,
    }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
