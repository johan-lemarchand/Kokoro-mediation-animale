import { NextResponse } from 'next/server';
import { requiredAuth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";
import { redis } from '@/lib/redis';

export async function POST(request: Request) {
  try {
    await requiredAuth();
  } catch {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { type, content, id } = await request.json();

  try {
    const updatedContent = await prisma.editableContent.upsert({
      where: { id },
      update: { content },
      create: { id, type, content },
    });

    await redis.set(`content:${content.id}`, content.content, { ex: 3600 });

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du contenu:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du contenu' }, { status: 500 });
  }
}
