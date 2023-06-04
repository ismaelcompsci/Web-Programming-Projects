import AuthModal from "@/components/modals/AuthModal";

const AuthPage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-black relative h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <img src="/hero.png" alt="hero"></img>
        </div>
        <AuthModal />
      </div>
    </div>
  );
};

export default AuthPage;
