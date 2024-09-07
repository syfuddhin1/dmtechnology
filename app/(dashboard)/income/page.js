import DateSelectForm from "../_component/DateSelectForm";
import DataTable from "./DataTable";

export default async function IncomeStatementPage({ params, searchParams }) {
  return (
    <>
      <DateSelectForm />
      {searchParams?.date && <DataTable {...searchParams} />}
    </>
  );
}
