"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import useLoginModal from "@/app/hooks/useLoginModal";
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

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const theme = useTheme();
  const router = useRouter();

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

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        //toast succes
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        //toast error
      }
    });
  };

  const handleClose = () => {
    loginModal.onClose();
  };

  return (
    <div>
      <Dialog
        open={loginModal.isOpen}
        onClose={loginModal.onClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        fullScreen={fullScreen}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ fontSize: 36 }}>Login</DialogTitle>
          <DialogTitle sx={{ fontSize: 16, color: "text.secondary" }}>
            Welcome back!
          </DialogTitle>
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
              <FcGoogle size={24} className="auth_button" />
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

export default LoginModal;
