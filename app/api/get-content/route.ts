import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
  }

  try {
    const content = await prisma.editableContent.findUnique({
      where: { id },
    });

    if (!content) {
      return NextResponse.json({ error: 'Contenu non trouvé' }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du contenu' }, { status: 500 });
  }
}
