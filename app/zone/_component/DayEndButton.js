"use client";
import { addBranchInfoByDate } from "@/lib/crud";
import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";

export default function DayEndButton({ data }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return; // Only proceed if the user confirms
    const response = await addBranchInfoByDate(data);
  };
  return (
    <button
      onClick={onSubmit}
      className={"btn flex gap-2 justify-center items-center p-2 px-4"}
    >
      <AiFillPlayCircle />
      <p>Execute Day End</p>
    </button>
  );
}
