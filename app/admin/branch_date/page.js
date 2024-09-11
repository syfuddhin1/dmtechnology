import { getDateData } from "@/lib/admin";
import React from "react";
import BranchDatesTable from "../_component/BranchDatesTable";

export default async function BranchDatePage({ params, searchParams }) {
  const dateData = await getDateData(searchParams);

  return <BranchDatesTable branches={dateData} />;
}
