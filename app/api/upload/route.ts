import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const token =
      process.env.UPLOADTHING_TOKEN ||
      'eyJhcGlLZXkiOiJza19saXZlXzVjMmJiYjFmYWZkNzljY2E1OGNkMWIxNDFhY2JmNTJhN2I5NjA5ZGE5YTYwMjk1ODA0Y2RmNDEyYWFmMzY4NWYiLCJhcHBJZCI6ImRyanFhMnpvY2kiLCJyZWdpb25zIjpbInNlYTEiXX0=';
    const utapi = new UTApi({ token });

    const response = await utapi.uploadFiles(file);

    if (response.error) {
      return NextResponse.json({ error: response.error.message }, { status: 500 });
    }

    const fileUrl = response.data.ufsUrl || response.data.url;

    return NextResponse.json({
      url: fileUrl,
      key: response.data.key,
      name: response.data.name,
      size: response.data.size,
    });
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}
