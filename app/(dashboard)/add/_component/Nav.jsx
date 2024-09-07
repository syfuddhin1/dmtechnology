"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VoucherNav() {
  const pathName = usePathname().slice(1);
  return (
    <div className={" flex gap-4 justify-center border-y border-black p-2"}>
      <Link
        className={`btn  ${
          pathName === "add/receipt" ? "bg-green-400" : "bg-gray-400"
        }`}
        href={"/add/receipt"}
      >
        Receipt Voucher
      </Link>
      <Link
        className={`btn ${
          pathName === "add/payment" ? "bg-green-400" : "bg-gray-400"
        }`}
        href={"/add/payment"}
      >
        Payment Voucher
      </Link>
    </div>
  );
}
