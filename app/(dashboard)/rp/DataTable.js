import { Accounts } from "@/services/data";
import CompanyHeader from "../_component/CompanyHeader";
import FootSignatureTable from "../_component/FootSignatureTable";
import PrintWrapper from "@/app/_component/PrintWrapper";
import { getRPReportData } from "@/lib/crud";
import { formatDate } from "@/utils/formatDate";
import { getDateName } from "@/utils/getDateName";
import { auth } from "@/auth";
import { renderAccounts } from "../_component/RenderAccountsForRp";
export default async function DataTable({ date }) {
  const name = (await auth())?.user?.name;
  const data = await getRPReportData(date);
  return (
    <PrintWrapper>
      <div className="">
        <CompanyHeader />
        <table width="100%" cellpadding="0" cellspacing="0" id="acc_reports">
          <tr class="rth">
            <td colspan="4" nowrap="nowrap" align="center" class="rtd">
              <h2 className="text-sm font-bold">
                <u>Receipt Payment</u>
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
                <strong>Receipt</strong>
              </th>
            </tr>
            {renderAccounts(Accounts, data.receipt, [106, 107, 108, 111])}
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
            {renderAccounts(Accounts, data.payment, [104, 105, 108, 110])}
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
