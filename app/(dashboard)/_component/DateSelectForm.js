"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DateSelectForm() {
  const searchParams = useSearchParams();
  const [date, setDate] = useState(
    searchParams.get("date") || new Date().toISOString().slice(0, 10)
  );
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (date) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("date", date);
      router.push(`?${newParams.toString()}`);
    }
  };

  return (
    <form className={"flex items-center gap-4 p-3"} onSubmit={onSubmit}>
      <label className="min-w-fit">Select Date</label>
      <input
        type="date"
        name={"date"}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={"text-black px-2"}
      />
      <button
        type="submit"
        className="bg-blue-500 min-w-fit text-white px-4 py-2 rounded"
      >
        Show Report
      </button>
    </form>
  );
}
