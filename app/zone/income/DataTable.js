import PrintWrapper from "@/app/_component/PrintWrapper";
import { auth } from "@/auth";
import { getIncomeStatementData } from "@/lib/zone";
import { Accounts } from "@/services/data";
import { formatDate } from "@/utils/formatDate";
import { getDateName } from "@/utils/getDateName";
import CompanyHeader from "../_component/CompanyHeader";
import FootSignatureTable from "../_component/FootSignatureTable";
export default async function DataTable({ date, branch }) {
  const name = (await auth())?.user?.name;
  const data = await getIncomeStatementData(date, branch);

  return (
    <PrintWrapper>
      <div className="">
        <CompanyHeader />
        <table width="100%" cellpadding="0" cellspacing="0" id="acc_reports">
          <tr class="rth">
            <td colspan="4" nowrap="nowrap" align="center" class="rtd">
              <h2 className="text-xs font-bold">
                <u>Income Statement</u>
              </h2>
              <strong>
                For the period ended <span>{getDateName(date).monthName}</span>,{" "}
                <span>{new Date(date).getFullYear()}</span>
              </strong>
            </td>
          </tr>
          <tr class="rth">
            <td colspan="2" nowrap="nowrap" align="left" class="rtd">
              <strong>Reporting Date : </strong>
              {date}
            </td>
            <td colspan="2" nowrap="nowrap" align="right" class="rtd">
              <strong>Print Date : </strong>
              {formatDate(new Date())}
            </td>
          </tr>
          <tr class="capitalize">
            <td colspan="2" nowrap="nowrap" align="left" class="rtd">
              <strong>Branch Name : </strong>
              {branch ? branch : "All"}
            </td>
          </tr>
        </table>
        <table
          className="font_size_11 vue-print"
          width="100%"
          border="1"
          cellPadding="0"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th className="acc_th" width="50%">Particulars</th>
              <th className="acc_th" width="5%">Notes</th>
              <th className="acc_th" width="15%">
                Current Month <br />
                (<span>{getDateName(date).monthName}</span>,{" "}
                <span>{new Date(date).getFullYear()}</span>)
              </th>
              <th className="acc_th" width="15%">
                Current Year <br />
                (FY-{data.date.fiscalYear})
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Income Section */}
            <tr>
              <th align="left" className="th_title" colSpan="4" style={{ backgroundColor: "#BFC4C9" }}>
                <strong>Income</strong>
              </th>
            </tr>

            {Accounts.slice(5, 8).map((account) => (
              <tr className="child-row19005_1" key={account.code}>
                <td align="left" className="text-left pl-10">{account.name}</td>
                <td align="center">-</td>
                <td align="right">{data.receipt.month[account.code]}</td>
                <td align="right">{data.receipt.year[account.code]}</td>
              </tr>
            ))}

            <tr className="font-bold">
              <td>Total Income</td>
              <td>-</td>
              <td>{data.receipt.totalCreditForMonth}</td>
              <td>{data.receipt.totalCreditForYear}</td>
            </tr>

            {/* Expense Section */}
            <tr>
              <th align="left" className="th_title" colSpan="4" style={{ backgroundColor: "#BFC4C9" }}>
                <strong>Expense</strong>
              </th>
            </tr>

            {Accounts.slice(8, 11).map((account) => (
              <tr className="child-row19005_1" key={account.code}>
                <td align="left" className="text-left pl-10">{account.name}</td>
                <td align="center">-</td>
                <td align="right">{data.payment.month[account.code]}</td>
                <td align="right">{data.payment.year[account.code]}</td>
              </tr>
            ))}

            <tr className="font-bold">
              <td>Total Expenses</td>
              <td>-</td>
              <td>{data.payment.totalDebitForMonth}</td>
              <td>{data.payment.totalDebitForYear}</td>
            </tr>

            {/* Surplus */}
            <tr className="bg-gray-200 font-bold">
              <td>Surplus</td>
              <td>-</td>
              <td>{data.surplus.month}</td>
              <td>{data.surplus.year}</td>
            </tr>
            {/* Total */}
            <tr className="font-bold">
              <td>Total Income</td>
              <td>-</td>
              <td>{data.receipt.totalCreditForMonth}</td>
              <td>{data.receipt.totalCreditForYear}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <FootSignatureTable />
      </div>
    </PrintWrapper>
  );
}
