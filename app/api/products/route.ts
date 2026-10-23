import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { merchandiseProducts } from '@/lib/data';
import { Product } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

let inMemoryProducts: Product[] = [...merchandiseProducts];

const formatProductRow = (row: any): Product => ({
  id: row.id,
  name: row.name,
  category: row.category,
  price: Number(row.price),
  originalPrice: row.original_price ? Number(row.original_price) : undefined,
  taxRate: row.tax_rate !== undefined ? Number(row.tax_rate) : undefined,
  platformFeeRate: row.platform_fee_rate !== undefined ? Number(row.platform_fee_rate) : undefined,
  platformFee: row.platform_fee !== undefined ? Number(row.platform_fee) : undefined,
  image: row.image,
  description: row.description || '',
  availableSizes: row.available_sizes || ['S', 'M', 'L', 'XL', 'XXL'],
  sizePrices: row.size_prices || {},
  inStock: Boolean(row.in_stock),
  stockCount: row.stock_count !== undefined ? Number(row.stock_count) : 50,
  badge: row.badge,
  details: row.details || [],
});

// GET /api/products
export async function GET() {
  try {
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin.from('products').select('*');
      if (!error && data) {
        inMemoryProducts = data.map(formatProductRow);
        return NextResponse.json({ products: inMemoryProducts }, { status: 200 });
      }
    }
  } catch (err) {
    console.error('API GET Products error:', err);
  }
  return NextResponse.json({ products: inMemoryProducts }, { status: 200 });
}

// POST /api/products - CREATE
export async function POST(request: Request) {
  try {
    const item: Product = await request.json();
    inMemoryProducts = [item, ...inMemoryProducts.filter((p) => p.id !== item.id)];

    if (supabaseAdmin) {
      const payload: any = {
        id: item.id,
        name: item.name,
        category: item.category,
        price: Number(item.price),
        original_price: item.originalPrice ? Number(item.originalPrice) : null,
        image: item.image,
        description: item.description || '',
        available_sizes: item.availableSizes || ['S', 'M', 'L', 'XL', 'XXL'],
        in_stock: Boolean(item.inStock),
        stock_count: item.stockCount !== undefined ? Number(item.stockCount) : 50,
        badge: item.badge || 'NEW ARRIVAL',
        details: item.details || ['Official Supporter Merchandise'],
      };
      if (item.taxRate !== undefined) payload.tax_rate = Number(item.taxRate);
      if (item.platformFeeRate !== undefined) payload.platform_fee_rate = Number(item.platformFeeRate);

      const { error } = await supabaseAdmin.from('products').upsert(payload);
      if (error) {
        // Fallback without dynamic columns in case table hasn't migrated them
        const { error: fallbackErr } = await supabaseAdmin.from('products').upsert({
          id: item.id,
          name: item.name,
          category: item.category,
          price: Number(item.price),
          original_price: item.originalPrice ? Number(item.originalPrice) : null,
          image: item.image,
          description: item.description || '',
          available_sizes: item.availableSizes || ['S', 'M', 'L', 'XL', 'XXL'],
          in_stock: Boolean(item.inStock),
          badge: item.badge || 'NEW ARRIVAL',
          details: item.details || ['Official Supporter Merchandise'],
        });
        if (fallbackErr) console.error('Supabase product insert error:', fallbackErr);
      }
    }

    return NextResponse.json({ success: true, product: item }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/products - UPDATE
export async function PUT(request: Request) {
  try {
    const item: Product = await request.json();
    inMemoryProducts = inMemoryProducts.map((p) => (p.id === item.id ? { ...p, ...item } : p));

    if (supabaseAdmin) {
      const payload: any = {
        id: item.id,
        name: item.name,
        category: item.category,
        price: Number(item.price),
        original_price: item.originalPrice ? Number(item.originalPrice) : null,
        image: item.image,
        description: item.description || '',
        available_sizes: item.availableSizes || ['S', 'M', 'L', 'XL', 'XXL'],
        in_stock: Boolean(item.inStock),
        stock_count: item.stockCount !== undefined ? Number(item.stockCount) : 50,
        badge: item.badge || '',
        details: item.details || [],
      };
      if (item.taxRate !== undefined) payload.tax_rate = Number(item.taxRate);
      if (item.platformFeeRate !== undefined) payload.platform_fee_rate = Number(item.platformFeeRate);

      const { error } = await supabaseAdmin.from('products').upsert(payload);
      if (error) {
        const { error: fallbackErr } = await supabaseAdmin.from('products').upsert({
          id: item.id,
          name: item.name,
          category: item.category,
          price: Number(item.price),
          original_price: item.originalPrice ? Number(item.originalPrice) : null,
          image: item.image,
          description: item.description || '',
          available_sizes: item.availableSizes || ['S', 'M', 'L', 'XL', 'XXL'],
          in_stock: Boolean(item.inStock),
          badge: item.badge || '',
          details: item.details || [],
        });
        if (fallbackErr) console.error('Supabase product update fallback error:', fallbackErr);
      }
    }

    return NextResponse.json({ success: true, product: item }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/products - DELETE
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    inMemoryProducts = inMemoryProducts.filter((p) => p.id !== id);

    if (supabaseAdmin) {
      await supabaseAdmin.from('products').delete().eq('id', id);
    }

    return NextResponse.json({ success: true, deletedId: id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
