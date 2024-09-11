import { getDateData } from "@/lib/admin";
import React from "react";
import BranchDatesTable from "../_component/BranchDatesTable";

export default async function BranchDatePage() {
  const dateData = await getDateData();
  console.log("dateData", dateData);
  return <BranchDatesTable branches={dateData} />;
}
