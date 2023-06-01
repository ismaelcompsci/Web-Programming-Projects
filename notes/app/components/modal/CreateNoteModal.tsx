"use client";
import React from "react";

import useCreateNoteModal from "@/app/hooks/useCreateNoteModal";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateNoteModal = () => {
  const createNoteModal = useCreateNoteModal();
  const theme = useTheme();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: { title: "", content: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);

    axios
      .post("/api/notes", data)
      .then(() => {
        //toast success
        router.refresh();
        reset();
        createNoteModal.onClose();
      })
      .catch(() => {
        //toast over
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleClose = () => {
    createNoteModal.onClose();
  };

  return (
    <div>
      <Dialog
        open={createNoteModal.isOpen}
        onClose={createNoteModal.onClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        fullScreen={fullScreen}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Title</DialogTitle>
          <DialogContent>
            <DialogContentText>Title of your note</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              disabled={isLoading}
              {...register("title", { required: true })}
            />
          </DialogContent>
          <DialogTitle>Note</DialogTitle>
          <DialogContent>
            <DialogContentText>You're note content</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Text"
              type="text"
              fullWidth
              rows={4}
              multiline
              disabled={isLoading}
              {...register("content", { required: true })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateNoteModal;
