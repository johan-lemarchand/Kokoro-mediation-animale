import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'public', 'images', 'galerie');
    const files = await fs.promises.readdir(dir);
    const images = files.filter((f) => /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f));
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ images: [], error: 'Could not read local gallery' }, { status: 500 });
  }
}
