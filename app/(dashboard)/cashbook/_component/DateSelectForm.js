"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DateSelectForm() {
  const searchParams = useSearchParams();
  const [date, setDate] = useState(searchParams.get("date"));
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
    <form className={"flex items-center gap-2 p-3"} onSubmit={onSubmit}>
      <label className="w-full">Select Date</label>
      <input
        type="date"
        name={"date"}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={"text-black px-2"}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
