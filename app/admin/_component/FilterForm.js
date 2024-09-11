"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function FilterAndSearchForm() {
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const newParams = new URLSearchParams(searchParams);
    if (q) {
      newParams.set("q", q);
      router.push(`?${newParams.toString()}`);
    } else {
      newParams.delete("q");
      router.push(`?${newParams.toString()}`);
    }
  };
  return (
    <form
      className={"flex items-center justify-center gap-3 text-[.65rem]"}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        name={"q"}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className={"text-black px-2"}
      />
      <button
        type="submit"
        className="bg-blue-500 min-w-fit text-white rounded px-2 py-1.5 flex  gap-1 justify-center items-center"
      >
        <AiOutlineSearch className="text-sm" /> search
      </button>
    </form>
  );
}
