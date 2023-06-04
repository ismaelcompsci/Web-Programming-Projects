import Link from "next/link";

const NavBar = () => {
  return (
    <div className="bg-transparent flex items-center justify-between sm:px-12 px-2 md:px-24 absolute top-0 z-10 w-full">
      <Link href="/" className="flex items-center justify-center h-20">
        <img src="/logo.png" alt="logo" className="h-full" />
      </Link>
      <div className="flex items-center">
        <button className="bg-brand-orange text-white px-2 py-1 sm:px4 rounded-md text-sm font-medium hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent transition duration-300 ease-in-out">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default NavBar;
