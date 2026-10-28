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
      const [galRes, deletedRes] = await Promise.all([
        supabaseAdmin.from('gallery').select('*').order('created_at', { ascending: false }),
        supabaseAdmin.from('site_config').select('value').eq('key', 'deleted_gallery_ids').single(),
      ]);

      const deletedIds = new Set<string>(
        deletedRes.data?.value && Array.isArray(deletedRes.data.value) ? deletedRes.data.value : []
      );

      if (!galRes.error && galRes.data) {
        const remoteIds = new Set(galRes.data.map((r: any) => r.id));
        const missingDefaults = galleryImages.filter((d) => !remoteIds.has(d.id) && !deletedIds.has(d.id));
        const activeRemote = galRes.data.map(formatGalleryRow).filter((r: any) => !deletedIds.has(r.id));
        inMemoryGallery = [...activeRemote, ...missingDefaults];
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
      // Un-delete if re-adding
      try {
        const { data: deletedRes } = await supabaseAdmin.from('site_config').select('value').eq('key', 'deleted_gallery_ids').single();
        if (deletedRes?.value && Array.isArray(deletedRes.value) && deletedRes.value.includes(item.id)) {
          const updated = deletedRes.value.filter((d: string) => d !== item.id);
          await supabaseAdmin.from('site_config').upsert({
            key: 'deleted_gallery_ids',
            value: updated,
            updated_at: new Date().toISOString(),
          });
        }
      } catch {}

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

      // Record in site_config under deleted_gallery_ids so default images never resurrect
      try {
        const { data: deletedRes } = await supabaseAdmin.from('site_config').select('value').eq('key', 'deleted_gallery_ids').single();
        const currentList: string[] = deletedRes?.value && Array.isArray(deletedRes.value) ? deletedRes.value : [];
        if (!currentList.includes(id)) {
          await supabaseAdmin.from('site_config').upsert({
            key: 'deleted_gallery_ids',
            value: [...currentList, id],
            updated_at: new Date().toISOString(),
          });
        }
      } catch (dErr) {
        console.error('Record deleted_gallery_ids error:', dErr);
      }
    }

    return NextResponse.json({ success: true, deletedId: id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
