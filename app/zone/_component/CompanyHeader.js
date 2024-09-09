import React from "react";
import PmkLogo from "./PmkLogo";
import Image from "next/image";

export default function CompanyHeader() {
  return (
    <div align="center">
      <div className="report_header_logo">
        <PmkLogo />
        <div class="report_header_content">
          <h2
            className={"text-sm font-black flex justify-center items-end gap-2"}
          >
            <Image src={"/pmklogo.png"} alt="logo" width={30} height={30} />
            Palli Mongal Karmosuchi (PMK)
          </h2>
          <p className="text-[.7rem]">Zirabo, Ashulia, Dhaka ,Bangladesh</p>
          <h2 className={"font-black mt-1 tracking-widest"}>
            <u>DM Technology</u>
          </h2>
        </div>
      </div>
    </div>
  );
}
