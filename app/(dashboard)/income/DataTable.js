import PrintWrapper from "@/app/_component/PrintWrapper";
import { auth } from "@/auth";
import { getIncomeStatementData } from "@/lib/crud";
import { Accounts } from "@/services/data";
import { formatDate } from "@/utils/formatDate";
import { getDateName } from "@/utils/getDateName";
import CompanyHeader from "../_component/CompanyHeader";
import FootSignatureTable from "../_component/FootSignatureTable";
export default async function DataTable({ date }) {
  const name = (await auth())?.user?.name;
  const data = await getIncomeStatementData(date);

  return (
    <PrintWrapper>
      <div className="">
        <CompanyHeader />
        <table width="100%" cellpadding="0" cellspacing="0" id="acc_reports">
          <tr class="rth">
            <td colspan="4" nowrap="nowrap" align="center" class="rtd">
              <h2 className="text-xl font-bold">
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
              {name}
            </td>
          </tr>
        </table>
        <table
          class="font_size_11 vue-print"
          width="100%"
          border="1"
          cellpadding="0"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th class="acc_th" width="50%">
                Particulars
              </th>
              <th class="acc_th" width="5%">
                Notes
              </th>
              <th class="acc_th" width="15%">
                Current Month
                <br />( <span>{getDateName(date).monthName}</span>,{" "}
                <span>{new Date(date).getFullYear()}</span>)
              </th>
              <th class="acc_th" width="15%">
                Current Year
                <br />
                (FY-{data.date.fiscalYear})
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th align="left" class="th_title" colspan="4" bgcolor="#BFC4C9">
                <strong>Income</strong>
              </th>
            </tr>

            <tr class="child-row19005_1">
              <td align="left" className="text-left pl-10">
                {Accounts[4].name}
              </td>
              <td align="center" class="">
                -{" "}
              </td>
              <td align="right" class="">
                {data.receipt.month[Accounts[4].code]}
              </td>
              <td align="right" class="">
                {data.receipt.year[Accounts[4].code]}
              </td>
            </tr>
            <tr class="child-row19005_1">
              <td align="left" className="text-left pl-10">
                {Accounts[5].name}
              </td>
              <td align="center" class="">
                -{" "}
              </td>
              <td align="right" class="">
                {data.receipt.month[Accounts[5].code]}
              </td>
              <td align="right" class="">
                {data.receipt.year[Accounts[5].code]}
              </td>
            </tr>
            <tr className="font-bold">
              <td>Total Income</td>
              <td>-</td>
              <td>{data.receipt.totalCreditForMonth}</td>
              <td>{data.receipt.totalCreditForYear}</td>
            </tr>
            <tr>
              <th align="left" class="th_title" colspan="4" bgcolor="#BFC4C9">
                <strong>Expense</strong>
              </th>
            </tr>
            <tr class="child-row19005_1">
              <td align="left" className="text-left pl-10">
                {Accounts[6].name}
              </td>
              <td align="center" class="">
                -{" "}
              </td>
              <td align="right" class="">
                {data.payment.month[Accounts[6].code]}
              </td>
              <td align="right" class="">
                {data.payment.year[Accounts[6].code]}
              </td>
            </tr>
            <tr class="child-row19005_1">
              <td align="left" className="text-left pl-10">
                {Accounts[7].name}
              </td>
              <td align="center" class="">
                -{" "}
              </td>
              <td align="right" class="">
                {data.payment.month[Accounts[7].code]}
              </td>
              <td align="right" class="">
                {data.payment.year[Accounts[7].code]}
              </td>
            </tr>

            <tr className="font-bold">
              <td>Total Expenses</td>
              <td>-</td>
              <td>{data.payment.totalDebitForMonth}</td>
              <td>{data.payment.totalDebitForYear}</td>
            </tr>
            <tr className="font-bold">
              <td>Surplus</td>
              <td>-</td>
              <td>{data.surplus.month}</td>
              <td>{data.surplus.year}</td>
            </tr>
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
