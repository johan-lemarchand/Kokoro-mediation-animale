import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { redis } from '@/lib/redis';

export async function POST(request: Request) {
  const body = await request.json();
  const { id, contentIds } = body;

  let idsToFetch: string[];

  if (id) {
    idsToFetch = [id];
  } else if (contentIds && Array.isArray(contentIds)) {
    idsToFetch = contentIds;
  } else {
    return NextResponse.json({ error: 'id ou contentIds manquant ou invalide' }, { status: 400 });
  }

  const contentMap: { [key: string]: string } = {};

  for (const contentId of idsToFetch) {
    const cachedContent = await redis.get(`content:${contentId}`);
    if (cachedContent) {
      contentMap[contentId] = cachedContent as string;
    }
  }

  // Récupérer les contenus non mis en cache depuis la base de données
  const missingIds = idsToFetch.filter(id => !contentMap[id]);

  if (missingIds.length > 0) {
    const contents = await prisma.editableContent.findMany({
      where: {
        id: {
          in: missingIds,
        },
      },
    });

    for (const content of contents) {
      contentMap[content.id] = content.content;
      await redis.set(`content:${content.id}`, content.content, { ex: 3600 });
    }
  }

  return NextResponse.json(contentMap);
}
