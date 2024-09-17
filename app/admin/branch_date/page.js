import { getDateData } from "@/lib/admin";
import React from "react";
import BranchDatesTable from "../_component/BranchDatesTable";
import { getUserData } from "@/lib";

export default async function BranchDatePage({ params, searchParams }) {
  const dateData = await getDateData(searchParams);
const zoneUsers = await getUserData({q: 'super'})
  return <BranchDatesTable branches={dateData} zoneUsers={zoneUsers} />;
}
