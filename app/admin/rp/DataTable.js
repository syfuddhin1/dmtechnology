import { Accounts } from "@/services/data";
import CompanyHeader from "../_component/CompanyHeader";
import FootSignatureTable from "../_component/FootSignatureTable";
import PrintWrapper from "@/app/_component/PrintWrapper";
import { getRPReportData } from "@/lib/admin";
import { formatDate } from "@/utils/formatDate";
import { getDateName } from "@/utils/getDateName";
import { auth } from "@/auth";
export default async function DataTable({ date, branch }) {
  const name = (await auth())?.user?.name;
  const data = await getRPReportData(date, branch);
  return (
    <PrintWrapper>
      <div className="">
        <CompanyHeader />
        <table width="100%" cellpadding="0" cellspacing="0" id="acc_reports">
          <tr class="rth">
            <td colspan="4" nowrap="nowrap" align="center" class="rtd">
              <h2 className="text-xs font-bold">
                <u>Receipt Payment</u>
              </h2>
              <strong>
                For the period ended <span>{getDateName(date).monthName}</span>,{" "}
                <span>{new Date(date).getFullYear()}</span>
              </strong>
            </td>
          </tr>
          <tr class="rth">
            <td colspan="2" nowrap="nowrap" align="left" class="text-left">
              <strong>Reporting Date : </strong>
              {date}
            </td>
            <td colspan="2" nowrap="nowrap" align="right" class="rtd">
              <strong>Print Date : </strong>
              {formatDate(new Date())}
            </td>
          </tr>
          <tr class="capitalize ">
            <td colspan="2" nowrap="nowrap" align="left" class="text-left">
              <strong>Branch Name : </strong>
              {branch ? branch : "All"}
            </td>
          </tr>
        </table>
        <table
          width="100%"
          border="1"
          cellpadding="0"
          cellspacing="0"
          className="text-xs"
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
                <strong>Receipt</strong>
              </th>
            </tr>
            {Accounts.map(
              (account) =>
                account.code !== 106 &&
                account.code !== 107 &&
                account.code !== 108 && (
                  <tr class="child-row19005_1" key={account.code}>
                    <td align="left" className="text-left pl-10">
                      {account.name}
                    </td>
                    <td align="center" class="">
                      -{" "}
                    </td>
                    <td align="right" class="">
                      {data.receipt.month[account.code]}
                    </td>
                    <td align="right" class="">
                      {data.receipt.year[account.code]}
                    </td>
                  </tr>
                )
            )}
            <tr className="font-bold">
              <td>Total Receipt</td>
              <td>-</td>
              <td>{data.receipt.totalCreditForMonth}</td>
              <td>{data.receipt.totalCreditForYear}</td>
            </tr>
            <tr>
              <th align="left" class="th_title" colspan="4" bgcolor="#BFC4C9">
                <strong>Payment</strong>
              </th>
            </tr>
            {Accounts.map(
              (account) =>
                account.code !== 104 &&
                account.code !== 105 &&
                account.code !== 108 && (
                  <tr class="child-row19005_1" key={account.code}>
                    <td align="left" className="text-left pl-10">
                      {account.name}
                    </td>
                    <td align="center" class="">
                      -{" "}
                    </td>
                    <td align="right" class="">
                      {data.payment.month[account.code]}
                    </td>
                    <td align="right" class="">
                      {data.payment.year[account.code]}
                    </td>
                  </tr>
                )
            )}
            <tr className="font-bold">
              <td>Total Payment</td>
              <td>-</td>
              <td>{data.payment.totalDebitForMonth}</td>
              <td>{data.payment.totalDebitForYear}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <FootSignatureTable />
      </div>
    </PrintWrapper>
  );
}
