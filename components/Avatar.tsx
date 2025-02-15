import React from "react";
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <React.Fragment>
    <Image
      className="rounded-full select-none"
      height="28"
      width="28"
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
    />
    <div className="absolute bottom-0 right-0">
      
    </div>
    </React.Fragment>
  );
};

export default Avatar;
