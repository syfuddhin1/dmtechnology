import { getAccountsName } from "@/services/data";
import { formatDate } from "@/utils/formatDate";

export default function LedgerTable({ openingBalance, updatedTransactions, totalReceipt, totalPayment, balance }) {
    return (
        <table className={"w-full"}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Voucher Code</th>
                    <th>Account Name</th>
                    <th>Debit Amount</th>
                    <th>Credit Amount</th>
                    <th>dr/cr</th>
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
                    <td align="right">{openingBalance.balance > 1 ? 'Dr' : 'Cr'}</td>
                    <td align="right">{openingBalance.balance}</td>
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
                            <td>{voucher.balance > 1 ? 'Dr' : 'Cr'}</td>
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
                        <strong>{balance > 1 ? 'Dr' : 'Cr'}</strong>
                    </td>
                    <td>
                        <strong>{balance}</strong>
                    </td>
                </tr>

            </tbody>
        </table>
    );
}