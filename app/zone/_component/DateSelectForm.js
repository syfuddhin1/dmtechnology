"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";


export default function DateSelectForm({ branchList }) {
  const searchParams = useSearchParams();
  const [date, setDate] = useState(
    searchParams.get("date") || new Date().toISOString().slice(0, 10)
  );
  const [branch, setBranch] = useState(searchParams.get("branch") || "");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (date) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("date", date);
      newParams.set("branch", branch);
      router.push(`?${newParams.toString()}`);
    }
  };

  return (
    <form
      className={"flex items-center justify-center gap-3 text-[.65rem]"}
      onSubmit={onSubmit}
    >
      <label className="min-w-fit">Branch</label>
      <select
        className="text-black px-2 text-start"
        onChange={(e) => setBranch(e.target.value)}
        value={branch}
      >
        <option value="" key={"All"}>
          {"All"}
        </option>
        {branchList.map((branch) => (
          <option key={branch.name} value={branch.name} className="capitalize">
            {branch.code}-{branch.name}
          </option>
        ))}
      </select>
      <label className="min-w-fit">Date</label>
      <input
        type="date"
        name={"date"}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={"text-black px-2"}
      />
      <button
        type="submit"
        className="bg-blue-500 min-w-fit text-white rounded px-2 py-1.5"
      >
        Show Report
      </button>
    </form>
  );
}
