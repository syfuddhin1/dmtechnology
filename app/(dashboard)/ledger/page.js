import { auth } from "@/auth";
import { getLedgerData } from "@/lib/crud";
import { getAccountsName } from "@/services/data";
import { calculateBalance } from "@/utils/calculateBalance";
import { formatDate } from "@/utils/formatDate";
import LedgerForm from "./LedgerForm";

export default async function Ledger({ searchParams }) {

    if (searchParams.dateTo) {
        const { voucherData, openingBalance } = await getLedgerData(searchParams);

        const { updatedTransactions, totalReceipt, totalPayment, balance } =
            calculateBalance(openingBalance.balance, voucherData);
        return <div>
            <h1 className="text-md text-center bg-green-200 p-1 font-bold">Ledger</h1>
            <LedgerForm />
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
        </div>;
    } else {
        return <div>
            <h1 className="text-md text-center bg-green-200 p-1 font-bold">Ledger</h1>
            <LedgerForm />
        </div>
    }
}
