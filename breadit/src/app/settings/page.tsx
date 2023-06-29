import UserNameForm from "@/components/UserNameForm";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings",
};

const page = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/signIn");
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="grid items-start gap-8">
        <h1 className="font-bold text-3xl md:text-4xl">Settings</h1>
        <div className="grid gap-10">
          <UserNameForm
            user={{
              // @ts-ignore
              username: session.user.username || "",
              // @ts-ignore
              id: session.user.id,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
