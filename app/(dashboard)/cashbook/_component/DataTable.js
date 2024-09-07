"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PmkLogo from "../../_component/PmkLogo";
import { numberToWords } from "@/utils/numToWord";
import { getAccountsName } from "@/services/data";
import { formatDate } from "@/utils/formatDate";
import PrintButton from "./PrintButton";
export default function DataTable({ vouchers = [], branch, date }) {
  const printRef = useRef();
  const openingBalance = 0;
  const calculateBalance = () => {
    let balance = openingBalance;
    let totalReceipt = 0;
    let totalPayment = 0;

    const updatedTransactions = vouchers.map((transaction) => {
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

  const print = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <>
      <PrintButton print={print} />
      <div className={"p-4"} ref={printRef}>
        <div align="center" className={"w-full"}>
          <div class="report_header_logo">
            <PmkLogo />
            <div class="report_header_content">
              <h2 className={"text-2xl font-black"}>
                <>Palli Mongal Karmosuchi (PMK)</>
              </h2>
              <h4>
                <>Zirabo, Ashulia, Dhaka ,Bangladesh</>
              </h4>
              <h2 className={"text-xl font-black tracking-widest"}>
                <>DM Technology</>
              </h2>
              <h4
                className={
                  "text-lg font-black underline underline-offset-8 mt-2"
                }
              >
                {" "}
                Cash & Bank Book Report
              </h4>
            </div>
          </div>
        </div>
        <table className={"w-full"}>
          <tr className="rth">
            <td nowrap="nowrap" align="left" className="text-left">
              <strong>Reporting Date : </strong>
              {date}
            </td>
            <td nowrap="nowrap" align="right" className="text-right">
              <strong>Print Date : </strong>{" "}
              {new Date().toLocaleDateString("en-CA")}
            </td>
          </tr>
          <tr className="rth">
            <td nowrap="nowrap" align="left" className="text-left">
              <strong>Branch : </strong>
              {branch?.name}
            </td>
            <td nowrap="nowrap" align="right" className="text-right">
              <strong>Cash Opening : </strong>
              {openingBalance}
            </td>
          </tr>
        </table>
        <table className={"w-full"}>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Voucher Code</th>
              <th>Particular</th>
              <th>Receipt (Debit)</th>
              <th>Payment (Credit)</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td align="center"></td>
              <td align="center">&nbsp;</td>
              <td align="center">&nbsp;</td>
              <td align="left">Opening Balance &nbsp;</td>
              <td align="right">0</td>
              <td align="right">0</td>
              <td align="right">{openingBalance}</td>
            </tr>
            {updatedTransactions.map((voucher, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{formatDate(voucher.date)}</td>
                  <td className="min-w-fit">{voucher.voucherCode}</td>
                  <td className={""}>
                    {voucher.voucherType == "receipt"
                      ? getAccountsName(voucher.creditAccounts)
                      : getAccountsName(voucher.debitAccounts)}
                  </td>
                  <td>
                    {voucher.voucherType == "receipt" ? voucher.amount : "-"}
                  </td>
                  <td>
                    {voucher.voucherType == "payment" ? voucher.amount : "-"}
                  </td>
                  <td>{voucher.balance}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="4" style={{ textAlign: "right" }}>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{totalReceipt}</strong>
              </td>
              <td>
                <strong>{totalPayment}</strong>
              </td>
              <td>
                <strong>{balance}</strong>
              </td>
            </tr>
            <tr className={"font-black text-md  p-4 capitalize"}>
              <td colSpan="7" className={"text-left p-2"}>
                In Words : <span>{numberToWords(balance)} only</span>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <div class="report-footer" align="center" border="0">
          <table
            id="report_footer_table"
            width="100%"
            border="0"
            cellspacing="0"
          >
            <tbody>
              <tr>
                <td nowrap="nowrap" class="text-left">
                  <strong>Signature :</strong>
                </td>
                <td nowrap="nowrap" class="text-left">
                  <strong>Signature :</strong>
                </td>
                <td nowrap="nowrap" class="text-left">
                  <strong>Signature :</strong>
                </td>
              </tr>
              <tr>
                <td nowrap="nowrap" class="text-left">
                  <strong>Prepared By :</strong>
                </td>
                <td nowrap="nowrap" class="text-left">
                  <strong>Verified By :</strong>
                </td>
                <td nowrap="nowrap" class="text-left">
                  <strong>Approved By :</strong>
                </td>
              </tr>
              <tr>
                <td nowrap="nowrap" class="text-left">
                  <strong>Designation :</strong>
                </td>
                <td nowrap="nowrap" class="text-left">
                  <strong>Designation :</strong>
                </td>
                <td nowrap="nowrap" class="text-left">
                  <strong>Designation :</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
