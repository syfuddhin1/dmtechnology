"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function FilterAndSearchForm({zoneUsers}) {
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
      className={"xl:flex grid items-center justify-center gap-3 text-[.65rem]"}
      onSubmit={onSubmit}
    >
  
      <select
        className="text-black px-2"
        onChange={(e) => {
          const newParams = new URLSearchParams(searchParams);
          if (e.target.value) {
            newParams.set("zone", e.target.value);
          } else {
            newParams.delete("zone");
          }
          router.push(`?${newParams.toString()}`);
        }}
        value={searchParams.get("zone") || ""}
      >
        <option value="">All Regions</option>
     {zoneUsers.map((user)=>(
      <option key={user.name} value={user.name}>{user.name}</option>
     ))}
      </select>
      <input
        type="text"
        name={"q"}
        value={q}
        placeholder="Search by name, email, code or role"
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
