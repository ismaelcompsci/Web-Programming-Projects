import prisma from "@/app/libs/prismadb";

export default async function getAllNotes() {
  try {
    const notes = await prisma.note.findMany({
      include: { author: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notes;
  } catch (error: any) {
    console.log(error, "ACTION_GETALLNOTES_ERROR");
    throw new Error(error);
  }
}
