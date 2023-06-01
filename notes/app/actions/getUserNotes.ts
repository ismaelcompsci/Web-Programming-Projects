import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getUserNotes() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const notes = await prisma.note.findMany({
      where: {
        authorId: currentUser.id,
      },
      include: { author: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notes;
  } catch (error: any) {
    console.log(error, "ACTION_GETUSERNOTES_ERROR");
    throw new Error(error);
  }
}
