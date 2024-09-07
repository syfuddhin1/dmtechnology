import FootSignatureTable from "@/app/(dashboard)/_component/FootSignatureTable";
import { getAccountsName } from "@/services/data";
import { formatDate } from "@/utils/formatDate";
import { numberToWords } from "@/utils/numToWord";
import CompanyHeader from "../../_component/CompanyHeader";
import PrintWrapper from "@/app/_component/PrintWrapper";
export default function DataTable({ data, type, voucherCode }) {
  const formatLedgerEntries = () => {
    const ledgerEntries = [];
    let totalDebit = 0;
    let totalCredit = 0;

    data.forEach((item) => {
      const amount = parseFloat(item.amount); // Convert amount to number

      // Debit Entry
      ledgerEntries.push({
        ledgerHead: "Cash at Bank",
        code: item.debitAccounts,
        debitAmount: amount,
        creditAmount: "",
        lineNote: item.narration,
      });
      totalDebit += amount;

      // Credit Entry
      ledgerEntries.push({
        ledgerHead: "Credit Account",
        code: item.creditAccounts,
        debitAmount: "",
        creditAmount: amount,
        lineNote: "",
      });
      totalCredit += amount;
    });

    return { ledgerEntries, totalDebit, totalCredit };
  };

  const { ledgerEntries, totalDebit, totalCredit } = formatLedgerEntries();

  return (
    <PrintWrapper>
      <div>
        <div data-v-88d4c87c="" className="card-body">
          <div
            data-v-88d4c87c=""
            id="report-container"
            className="table-responsive"
          >
            <div className="scroll-report voucher_print" id="report-container">
              <div className="report-header fontSize_11" align="center">
                <CompanyHeader />

                <table width="100%" align="center">
                  <tr>
                    <td align="center">
                      <h3
                        align="center"
                        className={
                          "capitalize font-black text-xl underline underline-offset-8"
                        }
                      >
                        {type} Voucher
                      </h3>
                    </td>
                  </tr>
                </table>
                <table
                  border="0"
                  cellSpacing="0"
                  width="100%"
                  cellPadding="6"
                  align="center"
                  className="capitalize"
                >
                  <tr>
                    <td align="left">
                      <strong>Voucher Code</strong>
                    </td>
                    <td align="left" className="text-left">
                      {voucherCode}
                    </td>
                    <td align="right">
                      <strong>Voucher Date </strong>
                    </td>
                    <td align="right" className="text-left">
                      {formatDate(data[0].date)}
                    </td>
                  </tr>
                  <tr>
                    <td align="left">
                      <strong>Branch Name</strong>
                    </td>
                    <td align="left" className="text-left">
                      {data[0].branch}
                    </td>
                    <td align="right">
                      <strong>Voucher Type</strong>
                    </td>
                    <td align="right" className="text-left">
                      {type}
                    </td>
                  </tr>
                </table>

                <table
                  className="report_class fontSize_11"
                  border="1"
                  cellSpacing="0"
                  width="100%"
                  cellPadding="6"
                  align="center"
                >
                  <tbody>
                    <tr className="">
                      <td width="25%" align="center">
                        <strong>Ledger Head</strong>
                      </td>
                      <td width="10%" align="center">
                        <strong>Code</strong>
                      </td>
                      <td width="15%" align="right">
                        <strong>Debit Amount</strong>
                      </td>
                      <td width="15%" align="right">
                        <strong>Credit Amount</strong>
                      </td>
                      <td width="30%" align="left">
                        <strong>Line Note</strong>
                      </td>
                    </tr>
                    <tr key={1}>
                      <td>{"Cash at Bank"}</td>
                      <td>{108}</td>
                      <td>{type === "receipt" ? totalCredit : ""}</td>
                      <td>{type === "receipt" ? "" : totalDebit}</td>
                      <td>{"-"}</td>
                    </tr>
                    {ledgerEntries.map(
                      (entry, index) =>
                        entry.code !== "108" && (
                          <tr key={index}>
                            <td>{getAccountsName(entry.code)}</td>
                            <td>{entry.code}</td>
                            <td>{entry.debitAmount}</td>
                            <td>{entry.creditAmount}</td>
                            <td>{entry.lineNote}</td>
                          </tr>
                        )
                    )}

                    <tr>
                      <td colSpan="2" align="center">
                        <strong>Total</strong>
                      </td>
                      <td>
                        <strong>{totalDebit}</strong>
                      </td>
                      <td>
                        <strong>{totalCredit}</strong>
                      </td>
                      <td></td>
                    </tr>

                    <tr>
                      <td
                        colSpan="5"
                        align="left"
                        className={"capitalize text-left p-2"}
                      >
                        <strong>
                          In words : {numberToWords(totalCredit)} Only
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />

                <FootSignatureTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrintWrapper>
  );
}
