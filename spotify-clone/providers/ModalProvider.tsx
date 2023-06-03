"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "@/types";

interface ModalProviderProsp {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProsp> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SubscribeModal products={products} />
      <UploadModal />
      <AuthModal />
    </>
  );
};

export default ModalProvider;
