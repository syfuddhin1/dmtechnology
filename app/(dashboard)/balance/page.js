import { getBalanceSheetData } from "@/lib/crud";
import DateSelectForm from "../_component/DateSelectForm";
import DataTable from "./DataTable";

export default async function BalanceSheetPage({ params, searchParams }) {
  return (
    <>
      <DateSelectForm />
      {searchParams?.date && <DataTable {...searchParams} />}
    </>
  );
}
