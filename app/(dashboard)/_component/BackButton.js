"use client";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className=" p-2 text-xs  bg-green-200 rounded-md hover:bg-green-300 capitalize flex justify-center items-center gap-2"
    >
      <AiOutlineArrowLeft />
      go back to voucher List
    </button>
  );
}
