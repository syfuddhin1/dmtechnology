import Form from "./Form";
import { auth } from "@/auth";
import { getDateData } from "@/lib/crud";
import VouchersTable from "../_component/VoucherTable";

export default async function Voucher({ params: { voucher } }) {
  const session = await auth();
  const date = await getDateData();
  return (
    <div>
      <p className=" mb-2 text-center text-xl font-black capitalize w-full">
        {/* {voucher} Voucher */}
      </p>
      <Form voucherType={voucher} user={session.user} date={date.data} />
      <div className="p-5">
        <VouchersTable voucherType={voucher} />
      </div>
    </div>
  );
}
