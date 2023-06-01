import "./globals.css";

import { Inter } from "next/font/google";

import CreateNoteModal from "./components/modal/CreateNoteModal";
import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";
import NavBar from "./components/navbar/NavBar";
import MyThemeProvider from "./components/ThemeProvider";
import getCurrentUser from "./actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notes",
  description: "Notes app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <MyThemeProvider>
      <html lang="en">
        <body className={inter.className}>
          <CreateNoteModal />
          <RegisterModal />
          <LoginModal />
          <NavBar currentUser={currentUser} />
          <div className="content">{children}</div>
        </body>
      </html>
    </MyThemeProvider>
  );
}
