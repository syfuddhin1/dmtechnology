import React from "react";

import DataTable from "./DataTable";
import DateSelectForm from "../_component/DateSelectForm";
import { getUserNameAndCode } from "@/lib/zone";

export default async function RPPage({ params, searchParams }) {
  const getBranchList = await getUserNameAndCode();
  return (
    <>
      <DateSelectForm branchList={getBranchList} />

      {searchParams?.date && <DataTable {...searchParams} />}
    </>
  );
}
