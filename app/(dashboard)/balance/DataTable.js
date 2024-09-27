import PrintWrapper from "@/app/_component/PrintWrapper";
import { auth } from "@/auth";
import { getBalanceSheetData } from "@/lib/crud";
import { Accounts } from "@/services/data";
import { formatDate } from "@/utils/formatDate";
import { getDateName } from "@/utils/getDateName";
import CompanyHeader from "../_component/CompanyHeader";
import FootSignatureTable from "../_component/FootSignatureTable";
export default async function DataTable({ date }) {
  const name = (await auth())?.user?.name;
  const data = await getBalanceSheetData(date);
  return (
    <PrintWrapper>
      <div className="">
        {/* <CompanyHeader /> */}
        <table width="100%" cellpadding="0" cellspacing="0" id="acc_reports">
          <tr class="rth">
            <td colspan="4" nowrap="nowrap" align="center" class="rtd">
              <h2 className="text-sm font-bold">
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
            <td colspan="2" nowrap="nowrap" align="left" class="rtd">
              <strong>Branch Name : </strong>
              {name}
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
                Prev Year <br />( FY-{data.date.prevFiscalYear} )
              </th>
              <th className="acc_th" width="15%">
                Current Year <br />( FY-{data.date.fiscalYear} )
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Assets Section */}
            <tr>
              <th align="left" className="th_title" colSpan="4" style={{ backgroundColor: "#BFC4C9" }}>
                <strong>Assets</strong>
              </th>
            </tr>

            {Accounts.slice(1, 5).map((account) => (
              <tr className="child-row19005_1" key={account.code}>
                <td align="left" className="text-left pl-10">{account.name}</td>
                <td align="center">-</td>
                <td align="right">{data.prevYear.balanceData[account.code]}</td>
                <td align="right">{data.thisYear.balanceData[account.code]}</td>
              </tr>
            ))}

            <tr className="font-bold">
              <td>Total Assets</td>
              <td>-</td>
              <td>{data.prevYear.total}</td>
              <td>{data.thisYear.total}</td>
            </tr>

            {/* Liabilities Section */}
            <tr>
              <th align="left" className="th_title" colSpan="4" style={{ backgroundColor: "#BFC4C9" }}>
                <strong>Liabilities</strong>
              </th>
            </tr>

            <tr className="font-bold">
              <td>Capital Fund</td>
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
