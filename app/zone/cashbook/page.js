import { auth } from "@/auth";
import { getUserNameAndCode, getVoucherDataByDate } from "@/lib/zone";
import DataTable from "./_component/DataTable";
import DateSelectForm from "../_component/DateSelectForm";
export default async function CashBook({
  params: {},
  searchParams: { date, branch: branchName },
}) {
  const branch = await auth();
  const vouchers = date ? await getVoucherDataByDate(date, branchName) : [];
  const getBranchList = await getUserNameAndCode();
  return (
    <div>
      <DateSelectForm branchList={getBranchList} />
      {date && (
        <DataTable
          vouchers={vouchers?.voucherData}
          branch={branchName}
          date={date}
        />
      )}
    </div>
  );
}
