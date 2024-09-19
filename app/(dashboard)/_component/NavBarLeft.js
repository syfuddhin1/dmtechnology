"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  AiFillAccountBook,
  AiFillFile,
  AiFillFileAdd,
  AiFillFileExcel,
  AiFillFileText,
  AiFillFileWord,
  AiFillReconciliation,
  AiOutlineDashboard,
  AiOutlineDollar,
} from "react-icons/ai";

export default function Nav() {
  const pathName = usePathname().slice(1);

  return (
    <div className="flex text-sm justify-center xl:flex-col flex-wrap gap-2 mx-4 my-4 w-full px-2">
      <Link
        className={`btn flex items-center gap-2 shadow shadow-black  ${pathName == "" ? "bg-green-400 text-black " : "bg-gray-400 text-white"
          }`}
        href={"/"}
      >
        <AiOutlineDashboard /> Day End
      </Link>
      <Link
        className={`flex items-center gap-2 btn shadow shadow-black   ${pathName.includes("add")
          ? "bg-green-400 text-black "
          : "bg-gray-400 text-white"
          }`}
        href={"/add/receipt"}
      >
        <AiFillFileAdd /> Add Voucher
      </Link>
      <Link
        className={`flex items-center gap-2 btn shadow shadow-black   ${pathName.includes("voucher_list")
          ? "bg-green-400 text-black "
          : "bg-gray-400 text-white"
          }`}
        href={"/voucher_list"}
      >
        <AiFillFile /> Voucher List
      </Link>
      <Link
        className={`flex items-center gap-2 btn shadow shadow-black   ${pathName.includes("cashbook")
          ? "bg-green-400 text-black "
          : "bg-gray-400 text-white"
          }`}
        href={"/cashbook"}
      >
        <AiOutlineDollar /> Cash & Bank book
      </Link>
      <Link
        className={`flex items-center gap-2 btn shadow shadow-black   ${pathName.includes("rp")
          ? "bg-green-400 text-black "
          : "bg-gray-400 text-white"
          }`}
        href={"/rp"}
      >
        <AiFillReconciliation />
        Recept Payment Report
      </Link>
      <Link
        className={`flex items-center gap-2 btn shadow shadow-black   ${pathName.includes("income")
          ? "bg-green-400 text-black "
          : "bg-gray-400 text-white"
          }`}
        href={"/income"}
      >
        <AiFillFileWord />
        Income Statement
      </Link>
      <Link
        className={`flex items-center gap-2 btn shadow shadow-black  ${pathName.includes("balance")
          ? "bg-green-400 text-black "
          : "bg-gray-400 text-white"
          }`}
        href={"/balance"}
      >
        <AiFillAccountBook /> Balance Sheet
      </Link>
      <Link
        className={`flex items-center gap-2 btn shadow shadow-black  ${pathName.includes("ledger")
          ? "bg-green-400 text-black "
          : "bg-gray-400 text-white"
          }`}
        href={"/ledger"}
      >
        <AiFillFileText /> Ledger
      </Link>
    </div>
  );
}
