import { getUserNameAndCode } from "@/lib/zone";
import DateSelectForm from "../_component/DateSelectForm";
import DataTable from "./DataTable";

export default async function IncomeStatementPage({ params, searchParams }) {
  const getBranchList = await getUserNameAndCode();
  return (
    <>
      <DateSelectForm branchList={getBranchList} />
      {searchParams?.date && <DataTable {...searchParams} />}
    </>
  );
}
