"use client";
import { useState } from "react";

import EditNoteIcon from "@mui/icons-material/EditNote";
import Menu from "@mui/material/Menu";
import { Avatar, Divider, IconButton, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import MobileNavBar from "./MobileNavBar";
import useCreateNoteModal from "@/app/hooks/useCreateNoteModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

//  CREATE NOTE
//      Pop up a modal form
// Search ^

interface NavBarProps {
  currentUser?: User | null;
}

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  const createNoteModal = useCreateNoteModal();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenModal = (page: string) => {
    if (page === "Create Note") {
      createNoteModal.onOpen();
    }

    if (page === "Sign In") {
      loginModal.onOpen();
    }

    if (page === "Register") {
      registerModal.onOpen();
    }

    handleCloseUserMenu();
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* DESKTOP */}
          <EditNoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Notes
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => handleOpenModal("Create Note")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Create Note
            </Button>
            <Button
              onClick={() => handleOpenModal("Search")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Search
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* USE USERS IMAGE */}
                <Avatar alt="UserImage" src={currentUser?.image || undefined} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {currentUser ? (
                <div>
                  <MenuItem onClick={() => router.push("/notes")}>
                    <Typography textAlign="center">My Notes</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => signOut()}>
                    <Typography textAlign="center">Log out</Typography>
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={() => handleOpenModal("Sign In")}>
                    <Typography textAlign="center">Sign In</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleOpenModal("Register")}>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>

          {/* MOBILE  */}
          <MobileNavBar
            pages={["Create Note", "Search"]}
            handleCloseNavMenu={handleCloseNavMenu}
            handleOpenNavMenu={handleOpenNavMenu}
            handleOpenModal={handleOpenModal}
            anchorElNav={anchorElNav}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
