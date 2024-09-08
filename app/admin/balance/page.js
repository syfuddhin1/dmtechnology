import DateSelectForm from "../_component/DateSelectForm";
import DataTable from "./DataTable";
import { getUserNameAndCode } from "@/lib/admin";

export default async function BalanceSheetPage({ params, searchParams }) {
  const getBranchList = await getUserNameAndCode();
  return (
    <>
      <DateSelectForm branchList={getBranchList} />
      {searchParams?.date && <DataTable {...searchParams} />}
    </>
  );
}
