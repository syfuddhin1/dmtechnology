import DeleteVoucher from "@/app/(dashboard)/add/_component/DeleteVoucher";
import { getDateData, getVoucherDataByDate } from "@/lib/crud";
import { getAccountsName } from "@/services/data";
import { formatDate } from "@/utils/formatDate";
const VouchersTable = async ({ voucherType }) => {
  const date = await getDateData();
  const vouchers = (await getVoucherDataByDate(date.data, voucherType))
    .voucherData;

  if (vouchers?.length === 0) {
    return (
      <div className={"h-96 w-full flex justify-center items-center text-xl"}>
        No {voucherType} Voucher Found
      </div>
    );
  }
  return (
    <table>
      <thead>
        <tr className={"w-full"}>
          <th>Sl</th>
          <th>Date</th>
          <th>Voucher Code</th>
          <th>Credit Account</th>
          <th>Debit Account</th>
          <th>Amount</th>
          <th>Narration</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {vouchers?.map((voucher, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{formatDate(voucher.date)}</td>
            <td>{voucher.voucherCode}</td>
            <td>{getAccountsName(voucher.creditAccounts)}</td>
            <td>{getAccountsName(voucher.debitAccounts)}</td>
            <td>{voucher.amount}</td>
            <td>{voucher?.narration}</td>
            <td>
              <DeleteVoucher voucher={voucher} />
            </td>
          </tr>
        ))}
        <tr>
          <th colSpan={5} className="text-right">
            Total
          </th>
          <th>
            {vouchers.reduce(
              (accumulator, voucher) => accumulator + Number(voucher.amount),
              0
            )}
          </th>
          <th></th>
          <th></th>
        </tr>
      </tbody>
    </table>
  );
};

export default VouchersTable;
