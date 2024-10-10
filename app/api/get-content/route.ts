import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

export async function POST(request: Request) {
  const body = await request.json();
  const { contentIds } = body;

  if (!contentIds || !Array.isArray(contentIds)) {
    return NextResponse.json({ error: 'contentIds manquant ou invalide' }, { status: 400 });
  }

  try {
    const contentMap: Record<string, string> = {};

    for (const id of contentIds) {
      const cachedContent = await redis.get(`content:${id}`);
      if (cachedContent && typeof cachedContent === 'string') {
        contentMap[id] = cachedContent;
      }
    }

    const missingIds = contentIds.filter(id => !contentMap[id]);

    if (missingIds.length > 0) {
      const contents = await prisma.editableContent.findMany({
        where: { id: { in: missingIds } },
      });

      for (const content of contents) {
        contentMap[content.id] = content.content;
        await redis.set(`content:${content.id}`, content.content, { ex: 3600 });
      }
    }

    return NextResponse.json(contentMap);
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du contenu' }, { status: 500 });
  }
}
