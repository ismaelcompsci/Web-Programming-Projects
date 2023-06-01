"use client";

import { Box, Grid, Stack } from "@mui/material";
import { Note, User } from "@prisma/client";
import NoteView from "./Note";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CardListViewProps {
  notes: (Note & {
    author: User;
  })[];
  currentUser?: User | null;
  showEdit: boolean;
}

const CardListView: React.FC<CardListViewProps> = ({
  notes,
  currentUser,
  showEdit,
}) => {
  const router = useRouter();

  const onDelete = (id: string) => {
    axios
      .delete(`/api/notes/${id}`)
      .then(() => {
        // toast success
        router.refresh();
      })
      .catch((error) => {
        //toast error
        console.log(error, "CARD_LIST_ONDELETE_ERROR");
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4 }}>
        {notes.map((note) => (
          <Grid item key={note?.id}>
            <NoteView
              title={note.title}
              content={note.content}
              user={note?.author}
              showEdit={showEdit}
              noteId={note.id}
              onDelete={onDelete}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardListView;
