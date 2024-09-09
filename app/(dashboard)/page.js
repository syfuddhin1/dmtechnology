// "use client";
import { AiFillPlayCircle } from "react-icons/ai";
import DayList from "./_component/DayList";
import { auth } from "@/auth";
import DayEndButton from "./_component/DayEndButton";
import { getDateData, getVoucherDataByDate } from "@/lib/crud";

export default async function DmTech() {
  const session = await auth();
  const date = (await getDateData()).data;
  const Vouchers = (await getVoucherDataByDate(date)).voucherData;
  const openingBalance = 0;

  const calculateBalance = () => {
    let balance = openingBalance;
    let totalReceipt = 0;
    let totalPayment = 0;

    const updatedTransactions = Vouchers.map((transaction) => {
      const amount = parseFloat(transaction.amount);
      if (transaction.voucherType === "receipt") {
        balance += amount;
        totalReceipt += amount;
      } else if (transaction.voucherType === "payment") {
        balance -= amount;
        totalPayment += amount;
      }
      return { ...transaction, balance: balance };
    });

    return { updatedTransactions, totalReceipt, totalPayment, balance };
  };

  const { updatedTransactions, totalReceipt, totalPayment, balance } =
    calculateBalance();

  const data = {
    ...session?.user,
    date,
    totalReceipt,
    totalPayment,
    balance,
  };

  return (
    <div className="w-full">
      <div className={"justify-between w-full text-xs"}>
        <div
          className={"flex justify-between items-center bg-green-200/30 p-2"}
        >
          <h5 className="font-bold">&nbsp;DM Day End Process</h5>
          <DayEndButton data={data} />
        </div>
        <DayList />
      </div>
    </div>
  );
}
