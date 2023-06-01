"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { User } from "@prisma/client";

interface NoteProps {
  title: string;
  content: string;
  user: User | null;
  noteId: string;
  showEdit?: boolean;
  onDelete?: (id: string) => void;
}

const NoteView: React.FC<NoteProps> = ({
  title,
  content,
  user,
  showEdit,
  noteId,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete?.(noteId);
  };

  return (
    <Paper sx={{ wordWrap: "break-word", padding: 2, position: "relative" }}>
      <Grid container spacing={1} alignItems={"center"}>
        <Avatar sx={{ marginRight: 1 }} src={user?.image || undefined} />
        <Typography variant="body1">@{user?.name}</Typography>
      </Grid>
      <Divider sx={{ margin: 2 }} />
      <Typography variant="h5" fontWeight={"semi-bold"}>
        {title}
      </Typography>
      <Typography maxWidth={200}>{content}</Typography>
      {showEdit && (
        <IconButton
          sx={{ position: "absolute", bottom: 0, right: 0 }}
          onClick={handleDelete}
          color="secondary"
          size="small"
          aria-label="delete"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      )}
    </Paper>
  );
};

export default NoteView;
