"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { toast } from "react-hot-toast";
import Button from "@/components/Button";

const AccountContent = () => {
  const router = useRouter();
  const { isLoading, subscription, user } = useUser();
  const subscribedModal = useSubscribeModal();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [router, isLoading, user]);

  const redirectToCustomPortal = async () => {
    setLoading(true);

    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });

      window.location.assign(url);
    } catch (error: any) {
      if (error) {
        toast.error(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No Active Plan</p>
          <Button onClick={subscribedModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}

      {subscription && (
        <div className="felx flex-col gap-y-4">
          <p>
            You are currently on the{" "}
            <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <Button
            className="w-[300px]"
            onClick={redirectToCustomPortal}
            disabled={loading || isLoading}
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
