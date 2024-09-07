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
            className={
              "text-2xl font-black flex justify-center items-end gap-2"
            }
          >
            <Image src={"/pmklogo.png"} alt="logo" width={70} height={50} />
            Palli Mongal Karmosuchi (PMK)
          </h2>
          <h4>
            <>Zirabo, Ashulia, Dhaka ,Bangladesh</>
          </h4>
          <h2 className={"text-xl font-black mt-1 tracking-widest"}>
            <>DM Technology</>
          </h2>
        </div>
      </div>
    </div>
  );
}
