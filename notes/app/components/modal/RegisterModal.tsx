"use client";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import { Divider, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const theme = useTheme();

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
        //open login modal
      })
      .catch((error) => {
        console.log(error, "REGISTER_ONSUBMIT_ERROR");
        //toast errot
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    registerModal.onClose();
  };

  return (
    <div>
      <Dialog
        open={registerModal.isOpen}
        onClose={registerModal.onClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        fullScreen={fullScreen}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ fontSize: 36 }}>Register</DialogTitle>
          <DialogContent>
            <DialogContentText>Name</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              {...register("name", { required: true })}
              disabled={isLoading}
              error={errors["name"] ? true : false}
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Email</DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              {...register("email", { required: true })}
              disabled={isLoading}
              error={errors["email"] ? true : false}
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Password</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              {...register("password", { required: true })}
              disabled={isLoading}
              error={errors["password"] ? true : false}
            />
          </DialogContent>
          <Divider />
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <FcGoogle
                size={24}
                className="auth_button"
                onClick={() => signIn("google")}
              />
              Continue with Google
            </Button>
            <Button variant="outlined" onClick={() => signIn("github")}>
              <AiFillGithub className="auth_button" size={24} />
              Continue with Github
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default RegisterModal;
