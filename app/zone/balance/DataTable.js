import PrintWrapper from "@/app/_component/PrintWrapper";
import { auth } from "@/auth";
import { getBalanceSheetData } from "@/lib/zone";
import { Accounts } from "@/services/data";
import { formatDate } from "@/utils/formatDate";
import { getDateName } from "@/utils/getDateName";
import CompanyHeader from "../_component/CompanyHeader";
import FootSignatureTable from "../_component/FootSignatureTable";
export default async function DataTable({ date, branch }) {
  const name = (await auth())?.user?.name;
  const data = await getBalanceSheetData(date, branch);
  return (
    <PrintWrapper>
      <div className="">
        <CompanyHeader />
        <table width="100%" cellpadding="0" cellspacing="0" id="acc_reports">
          <tr class="rth">
            <td colspan="4" nowrap="nowrap" align="center" class="rtd">
              <h2 className="text-xs font-bold">
                <u>Balance Sheet Report</u>
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
            <td colspan="2" nowrap="nowrap" align="left" className="text-left">
              <strong>Branch Name : </strong>
              {branch ? branch : "All"}
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
                Prev Year
                <br />( FY-{data.date.prevFiscalYear})
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
                <strong>Assets</strong>
              </th>
            </tr>

            <tr class="child-row19005_1">
              <td align="left" className="text-left pl-10">
                {Accounts[2].name}
              </td>
              <td align="center" class="">
                -{" "}
              </td>
              <td align="right" class="">
                {data.prevYear.balanceData[Accounts[2].code]}
              </td>
              <td align="right" class="">
                {data.thisYear.balanceData[Accounts[2].code]}
              </td>
            </tr>
            <tr class="child-row19005_1">
              <td align="left" className="text-left pl-10">
                {Accounts[3].name}
              </td>
              <td align="center" class="">
                -{" "}
              </td>
              <td align="right" class="">
                {data.prevYear.balanceData[Accounts[3].code]}
              </td>
              <td align="right" class="">
                {data.thisYear.balanceData[Accounts[3].code]}
              </td>
            </tr>
            <tr class="child-row19005_1">
              <td align="left" className="text-left pl-10">
                {Accounts[1].name}
              </td>
              <td align="center" class="">
                -{" "}
              </td>
              <td align="right" class="">
                {data.prevYear.balanceData[Accounts[1].code]}
              </td>
              <td align="right" class="">
                {data.thisYear.balanceData[Accounts[1].code]}
              </td>
            </tr>
            <tr className="font-bold">
              <td>Total Assets</td>
              <td>-</td>
              <td>{data.prevYear.total}</td>
              <td>{data.thisYear.total}</td>
            </tr>
            <tr>
              <th align="left" class="th_title" colspan="4" bgcolor="#BFC4C9">
                <strong>Liabilities</strong>
              </th>
            </tr>

            <tr className="font-bold">
              <td>Surplus</td>
              <td>-</td>
              <td>{data.prevYear.surplus}</td>
              <td>{data.thisYear.surplus}</td>
            </tr>
            <tr className="font-bold">
              <td>Total Liabilities</td>
              <td>-</td>
              <td>{data.prevYear.surplus}</td>
              <td>{data.thisYear.surplus}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <FootSignatureTable />
      </div>
    </PrintWrapper>
  );
}
