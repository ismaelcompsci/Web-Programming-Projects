import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  noteId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { noteId } = params;

  if (!noteId || typeof noteId !== "string") {
    throw new Error("Invalid ID");
  }

  const note = await prisma.note.deleteMany({
    where: {
      id: noteId,
      authorId: currentUser.id,
    },
  });

  return NextResponse.json(note);
}
