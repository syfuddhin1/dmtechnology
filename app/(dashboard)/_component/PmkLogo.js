import Image from "next/image";
import React from "react";

export default function PmkLogo() {
  return (
    <div class="flex justify-center">
      <Image
        src={"/dmlogo.png"}
        id="logo_image"
        alt="logo"
        width={100}
        height={100}
      />
    </div>
  );
}
