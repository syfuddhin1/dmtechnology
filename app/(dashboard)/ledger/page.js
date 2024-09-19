import { getLedgerData } from "@/lib/crud";
import { calculateBalance } from "@/utils/calculateBalance";
import LedgerForm from "./LedgerForm";
import LedgerTable from "./LedgerTable";
export default async function Ledger({ searchParams }) {

    if (searchParams.dateTo && searchParams.dateFrom) {
        const { voucherData, openingBalance } = await getLedgerData(searchParams);
        const { updatedTransactions, totalReceipt, totalPayment, balance } =
            calculateBalance(openingBalance.balance, voucherData);
        return <div>
            <h1 className="text-md text-center bg-green-200 p-1 font-bold">Ledger</h1>
            <LedgerForm />
            <LedgerTable openingBalance={openingBalance} updatedTransactions={updatedTransactions} totalReceipt={totalReceipt} totalPayment={totalPayment} balance={balance} />
        </div>;
    } else {
        return <div>
            <h1 className="text-md text-center bg-green-200 p-1 font-bold">Ledger</h1>
            <LedgerForm />
        </div>
    }
}
