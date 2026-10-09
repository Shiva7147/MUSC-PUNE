import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { galleryImages } from '@/lib/data';
import { GalleryItem } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

let inMemoryGallery: GalleryItem[] = [...galleryImages];

const formatGalleryRow = (row: any): GalleryItem => ({
  id: row.id,
  title: row.title,
  category: row.category,
  imageUrl: row.image_url,
  location: row.location || '',
  date: row.date || '',
  caption: row.caption || '',
});

// GET /api/gallery
export async function GET() {
  try {
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin.from('gallery').select('*');
      if (!error && data) {
        inMemoryGallery = data.map(formatGalleryRow);
        return NextResponse.json({ gallery: inMemoryGallery }, { status: 200 });
      }
    }
  } catch (err) {
    console.error('API GET Gallery error:', err);
  }
  return NextResponse.json({ gallery: inMemoryGallery }, { status: 200 });
}

// POST /api/gallery - CREATE
export async function POST(request: Request) {
  try {
    const item: GalleryItem = await request.json();
    inMemoryGallery = [item, ...inMemoryGallery.filter((g) => g.id !== item.id)];

    if (supabaseAdmin) {
      await supabaseAdmin.from('gallery').upsert({
        id: item.id,
        title: item.title,
        category: item.category,
        image_url: item.imageUrl,
        location: item.location,
        date: item.date,
        caption: item.caption,
      });
    }

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/gallery - DELETE
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing gallery ID' }, { status: 400 });
    }

    inMemoryGallery = inMemoryGallery.filter((g) => g.id !== id);

    if (supabaseAdmin) {
      await supabaseAdmin.from('gallery').delete().eq('id', id);
    }

    return NextResponse.json({ success: true, deletedId: id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
