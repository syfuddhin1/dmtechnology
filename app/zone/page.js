import { getDateData } from "@/lib/zone";
import React from "react";
import BranchDatesTable from "./_component/BranchDatesTable";

export default async function BranchDatePage() {
  const dateData = await getDateData();

  return (
    <div className="w-full">
      <BranchDatesTable branches={dateData} />
    </div>
  );
}
