"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      width={30}
      height={30}
      className="rounded-full"
      src={src || "/images/placeholder.jpg"}
      alt="avatar"
    />
  );
};

export default Avatar;
