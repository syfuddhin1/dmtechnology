import React from "react";
import { AiOutlinePrinter } from "react-icons/ai";

export default function PrintButton({ print }) {
  return (
    <button
      className={
        "shadowBtn btn absolute top-[15.5rem] xl:top-24 xl:right-10 flex items-center gap-4 justify-center right-1"
      }
      onClick={print}
    >
      <AiOutlinePrinter className={"text-2xl"} /> Print
    </button>
  );
}
