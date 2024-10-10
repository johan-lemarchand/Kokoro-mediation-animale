import { NextRequest, NextResponse } from 'next/server';
import { requiredAuth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";
import { redis } from '@/lib/redis';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    await requiredAuth();
  } catch {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const type = formData.get('type') as string;
    const file = formData.get('file') as File | null;

    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }

    let content: string;

    if (type === 'image' && file) {
      const fileName = `${Date.now()}_${file.name || 'image.jpg'}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data, error } = await supabase.storage
        .from('kokoro')
        .upload(`images/landing/${fileName}`, buffer, {
          contentType: file.type || 'image/jpeg'
        });

      if (error) {
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('kokoro')
        .getPublicUrl(`images/landing/${fileName}`);

      content = publicUrl;
    } else if (type === 'image' && !file) {
      return NextResponse.json({ error: 'Fichier image manquant' }, { status: 400 });
    } else {
      content = formData.get('content') as string;
    }

    const updatedContent = await prisma.editableContent.upsert({
      where: { id },
      update: { content, type },
      create: { id, type, content },
    });

    await redis.set(`content:${id}`, updatedContent.content, { ex: 3600 });

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du contenu:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du contenu' }, { status: 500 });
  }
}
