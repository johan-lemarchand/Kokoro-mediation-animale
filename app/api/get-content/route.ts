import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

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

  try {
    const contents = await prisma.editableContent.findMany({
      where: {
        id: {
          in: idsToFetch,
        },
      },
    });

    const contentMap = contents.reduce((acc: { [key: string]: string }, content) => {
      acc[content.id] = content.content;
      return acc;
    }, {});

    NextResponse.next().headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    return NextResponse.json(contentMap);
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du contenu' }, { status: 500 });
  }
}
