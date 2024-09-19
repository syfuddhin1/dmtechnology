import { auth } from "@/auth";
import { getAccountsName } from "@/services/data";
import { formatDate } from "@/utils/formatDate";
import FootSignatureTable from "../_component/FootSignatureTable";
import CompanyHeader from "../_component/CompanyHeader";
import PrintWrapper from "@/app/_component/PrintWrapper";


export default async function LedgerTable({ searchParams, openingBalance, updatedTransactions, totalReceipt, totalPayment, balance }) {
    const name = (await auth()).user.name;
    return (
        <PrintWrapper>
            <div className="p-5">
                <CompanyHeader />
                <table width="100%" border="0" cellpadding="0" cellspacing="0" id="acc_reports">
                    <tr class="rth">
                        <td colspan="9"><h2 className="text-sm font-bold"><u>Ledger Report</u></h2></td>
                    </tr>
                    <tr class="rth">
                        <td colspan="4" className="text-left"><strong>Reporting Date : </strong>{(searchParams.dateFrom)} to {(searchParams.dateTo)}</td>
                        <td colspan="5" className="text-right"><strong>Print Date : </strong>{formatDate(new Date())}</td>
                    </tr>
                    <tr class="rth">
                        <td colspan="4" className="text-left"><strong>Ledger Head : </strong>{getAccountsName(searchParams.accountName)} ({searchParams.accountName})</td>
                        <td colspan="5" className="text-right"><strong>Cummulative DR : </strong>{openingBalance.prevDebitTotal}</td>
                    </tr>
                    <tr class="rth">
                        <td colspan="4" className="text-left"><strong>Branch : </strong>{name}</td>
                        <td colspan="5" className="text-right"><strong>Cummulative CR : </strong>{openingBalance.prevCreditTotal}</td>
                    </tr>
                </table>
                <table className={"w-full"}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Voucher Code</th>
                            <th>Account Name</th>
                            <th>Debit Amount</th>
                            <th>Credit Amount</th>
                            <th>Balance</th>
                            <th>Dr/Cr</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr>
                            <td align="center"></td>
                            <td align="center">&nbsp;</td>
                            <td align="center">&nbsp;</td>
                            <td align="left">Opening Balance &nbsp;</td>
                            <td align="right">-</td>
                            <td align="right">-</td>
                            <td align="right">{openingBalance.balance}</td>
                            <td align="right">{openingBalance.balance > 1 ? 'Dr' : 'Cr'}</td>
                        </tr>
                        {updatedTransactions.map((voucher, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{formatDate(voucher.date)}</td>
                                    <td className="min-w-fit">{voucher.voucherCode}</td>
                                    <td className={""}>
                                        {voucher.voucherType == "payment"
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
                                    <td>{voucher.balance > 1 ? 'Dr' : 'Cr'}</td>
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
                            <td>
                                <strong>{balance > 1 ? 'Dr' : 'Cr'}</strong>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" id="acc_reports">

                    <tr class="rth">
                        <td colspan="9" className="text-right"><strong>Cummulative DR : </strong>{openingBalance.prevDebitTotal + totalReceipt}</td>
                    </tr>
                    <tr class="rth">
                        <td colspan="9" className="text-right"><strong>Cummulative CR : </strong>{openingBalance.prevCreditTotal + totalPayment}</td>
                    </tr>

                </table>
                <FootSignatureTable />
            </div>
        </PrintWrapper>
    );
}