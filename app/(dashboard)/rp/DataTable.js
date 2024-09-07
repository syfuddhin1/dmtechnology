import { Accounts } from "@/services/data";
import CompanyHeader from "../_component/CompanyHeader";
import FootSignatureTable from "../_component/FootSignatureTable";
import PrintWrapper from "@/app/_component/PrintWrapper";
export default function DataTable() {
  const totalCurrentMonthReceipt = 0;
  const totalCurrentMonthPayment = 0;
  const totalCurrentYearReceipt = 0;
  const totalCurrentYearPayment = 0;

  return (
    <PrintWrapper>
      <div className="">
        <CompanyHeader />
        <table width="100%" cellpadding="0" cellspacing="0" id="acc_reports">
          <tr class="rth">
            <td colspan="4" nowrap="nowrap" align="center" class="rtd">
              <h2 className="text-xl font-bold">
                <u>Receipt Payment</u>
              </h2>
              <strong>For the period ended September, 2024</strong>
            </td>
          </tr>
          <tr class="rth">
            <td colspan="2" nowrap="nowrap" align="left" class="rtd">
              <strong>Reporting Date : </strong>07-09-2024
            </td>
            <td colspan="2" nowrap="nowrap" align="right" class="rtd">
              <strong>Print Date : </strong>07-09-2024
            </td>
          </tr>
          <tr class="rth">
            <td colspan="2" nowrap="nowrap" align="left" class="rtd">
              <strong>Branch Name : </strong>Noyabazar-1
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
                <br />
                (September, 24)
              </th>
              <th class="acc_th" width="15%">
                Current Year
                <br />
                (FY-2024-2025)
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
                account.code !== 107 && (
                  <tr class="child-row19005_1" key={account.id}>
                    <td align="left" class=" depth3">
                      {account.name}
                    </td>
                    <td align="center" class="">
                      -{" "}
                    </td>
                    <td align="right" class="">
                      {account.current_month}
                    </td>
                    <td align="right" class="">
                      {account.current_year}
                    </td>
                  </tr>
                )
            )}
            <tr className="font-bold">
              <td>Total Receipt</td>
              <td>-</td>
              <td>{totalCurrentMonthReceipt}</td>
              <td>{totalCurrentYearReceipt}</td>
            </tr>
            <tr>
              <th align="left" class="th_title" colspan="4" bgcolor="#BFC4C9">
                <strong>Payment</strong>
              </th>
            </tr>
            {Accounts.map(
              (account) =>
                account.code !== 104 &&
                account.code !== 105 && (
                  <tr class="child-row19005_1" key={account.id}>
                    <td align="left" class=" depth3">
                      {account.name}
                    </td>
                    <td align="center" class="">
                      -{" "}
                    </td>
                    <td align="right" class="">
                      {account.current_month}
                    </td>
                    <td align="right" class="">
                      {account.current_year}
                    </td>
                  </tr>
                )
            )}
            <tr className="font-bold">
              <td>Total Payment</td>
              <td>-</td>
              <td>{totalCurrentMonthPayment}</td>
              <td>{totalCurrentYearPayment}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <FootSignatureTable />
      </div>
    </PrintWrapper>
  );
}
