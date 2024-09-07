// "use client";
import { AiFillPlayCircle } from "react-icons/ai";
import DayList from "./_component/DayList";
import { auth } from "@/auth";

export default async function DmTech() {
  const session = await auth();
  console.log("session", session);
  // const branch = useSelector((state) => state.userDetails);
  // const [Vouchers, setVouchers] = React.useState([]);
  // const openingBalance = 0;
  // const dispatch = useDispatch();

  // const calculateBalance = () => {
  //   let balance = openingBalance;
  //   let totalReceipt = 0;
  //   let totalPayment = 0;

  //   const updatedTransactions = Vouchers.map((transaction) => {
  //     const amount = parseFloat(transaction.amount);
  //     if (transaction.voucherType === "recipt") {
  //       balance += amount;
  //       totalReceipt += amount;
  //     } else if (transaction.voucherType === "payment") {
  //       balance -= amount;
  //       totalPayment += amount;
  //     }
  //     return { ...transaction, balance: balance };
  //   });

  //   return { updatedTransactions, totalReceipt, totalPayment, balance };
  // };

  // const { updatedTransactions, totalReceipt, totalPayment, balance } =
  //   calculateBalance();

  // useEffect(() => {
  //   async function getVouchers() {
  //     const res = await fetch(`${getBaseUrl()}/dm/voucher/date/${branch.day}`);
  //     const data = await res.json();
  //     setVouchers(data);
  //   }
  //   getVouchers();
  // }, []);
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch(`${getBaseUrl()}/dm/day`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       code: branch.code,
  //       email: branch.email,
  //       branchName: branch.name,
  //       date: branch.day,
  //       balance,
  //       totalReceipt,
  //       totalPayment,
  //     }),
  //   });
  //   const data = await res.json();
  //   dispatch(
  //     updateUser({
  //       day: data.day,
  //     })
  //   );
  // };

  return (
    <div className="grid w-full">
      <div className={"grid justify-between w-full"}>
        <div className={"flex justify-between w-[70vw] bg-green-200/30 p-2 "}>
          <h5>&nbsp;DM Day End Process</h5>
          <button
            // onClick={onSubmit}
            className={
              "px-2.5 bg-pink-300 rounded-sm p-.05 flex justify-center items-center gap-1"
            }
          >
            <AiFillPlayCircle />
            &nbsp;Execute Day End
          </button>
        </div>
        <DayList />
      </div>
    </div>
  );
}
