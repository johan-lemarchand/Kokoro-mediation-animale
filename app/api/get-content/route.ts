import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, contentIds } = body;

  console.log("Requête reçue:", { id, contentIds });

  let idsToFetch: string[];

  if (id) {
    idsToFetch = [id];
  } else if (contentIds && Array.isArray(contentIds)) {
    idsToFetch = contentIds;
  } else {
    console.log("Erreur: id ou contentIds manquant ou invalide");
    return NextResponse.json({ error: 'id ou contentIds manquant ou invalide' }, { status: 400 });
  }

  console.log("IDs à récupérer:", idsToFetch);

  try {
    const contents = await prisma.editableContent.findMany({
      where: {
        id: {
          in: idsToFetch,
        },
      },
    });

    console.log("Contenu récupéré de la base de données:", contents);

    const contentMap = contents.reduce((acc: { [key: string]: string }, content) => {
      acc[content.id] = content.content;
      return acc;
    }, {});

    console.log("Contenu mappé à renvoyer:", contentMap);

    return NextResponse.json(contentMap);
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du contenu' }, { status: 500 });
  }
}
