import React from "react";

import DataTable from "./DataTable";
import DateSelectForm from "../_component/DateSelectForm";

export default function RPPage({ params, searchParams }) {
  return (
    <>
      <DateSelectForm />
      {searchParams?.date && <DataTable {...searchParams} />}
    </>
  );
}
