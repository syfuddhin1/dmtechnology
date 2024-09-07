import { auth } from "@/auth";
import DataTable from "./_component/DataTable";
import { getVoucherDataByDate } from "@/lib/crud";
import DateSelectForm from "./_component/DateSelectForm";
export default async function CashBook({ params: {}, searchParams: { date } }) {
  const branch = await auth();
  const vouchers = date ? await getVoucherDataByDate(date) : [];
  console.log(vouchers);
  console.log(date);

  return (
    <div>
      <DateSelectForm />
      {date && (
        <DataTable
          vouchers={vouchers?.voucherData}
          branch={branch.user}
          date={date}
        />
      )}
    </div>
  );
}
