"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav() {
  const pathName = usePathname().slice(1);

  return (
    <div className="flex text-sm justify-center xl:flex-col flex-wrap gap-2 mx-4 my-4 w-full px-2">
      <Link
        className={`btn  ${
          pathName == "" ? "bg-green-400" : "bg-gray-400 text-white"
        }`}
        href={"/"}
      >
        DashBoard
      </Link>
      <Link
        className={`btn  ${
          pathName.includes("add") ? "bg-green-400" : "bg-gray-400 text-white"
        }`}
        href={"/add/receipt"}
      >
        Add Voucher
      </Link>
      <Link
        className={`btn  ${
          pathName.includes("voucher_list")
            ? "bg-green-400"
            : "bg-gray-400 text-white"
        }`}
        href={"/voucher_list"}
      >
        Voucher List
      </Link>
      <Link
        className={`btn  ${
          pathName.includes("cashbook")
            ? "bg-green-400"
            : "bg-gray-400 text-white"
        }`}
        href={"/cashbook"}
      >
        Cash & Bank book
      </Link>
      <Link
        className={`btn  ${
          pathName.includes("rp") ? "bg-green-400" : "bg-gray-400 text-white"
        }`}
        href={"/rp"}
      >
        Recept Payment Report
      </Link>
      <Link
        className={`btn  ${
          pathName.includes("income")
            ? "bg-green-400"
            : "bg-gray-400 text-white"
        }`}
        href={"/income"}
      >
        Income Statement
      </Link>
      <Link
        className={`btn ${
          pathName.includes("balance")
            ? "bg-green-400"
            : "bg-gray-400 text-white"
        }`}
        href={"/balance"}
      >
        Balance Sheet
      </Link>
    </div>
  );
}
