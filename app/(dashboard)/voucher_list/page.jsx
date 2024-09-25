import { getVoucherData } from "@/lib/crud";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { AiFillEye, AiFillPrinter } from "react-icons/ai";
export default async function VoucherList() {
  const VoucherList = (await getVoucherData()).voucherData;
  return (
    <div className={"w-full"}>
      <div className="bg-green-300/50 flex justify-between items-center px-3" >
        <h2 className="text-center  tracking-widest font-sans  p-2">
          Voucher List
        </h2>
        <Link href={'/add/receipt'} className="bg-blue-400 p-1 rounded-md px-2 text-sm ">Add Voucher</Link>
      </div>
      <table className={"w-full"}>
        <thead>
          <tr>
            <th>Index</th>
            <th>Voucher Code</th>
            <th>Voucher Type</th>
            <th>Voucher Amount</th>
            <th>Date</th>
            <th>Entry By</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {VoucherList.map((voucher, index) => (
            <tr key={index} className={"capitalize"}>
              <td>{index + 1}</td>
              <td>{voucher.voucherCode}</td>
              <td>{voucher.voucherType}</td>
              <td>{voucher.amount}</td>
              <td>{formatDate(voucher.date)}</td>
              <td>{voucher.branch}</td>
              <td className="text-center">
                <button>
                  <Link href={`/voucher_list/${voucher.voucherCode}`}>
                    <AiFillEye className="text-xl" />
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
