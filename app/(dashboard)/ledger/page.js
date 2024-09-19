import { getLedgerData } from "@/lib/crud";
import { calculateBalance } from "@/utils/calculateBalance";
import LedgerForm from "./LedgerForm";
import LedgerTable from "./LedgerTable";
import { AiOutlineWarning } from "react-icons/ai";
export default async function Ledger({ searchParams }) {
    const isDateFromGreaterThanDateTo = new Date(searchParams.dateFrom) > new Date(searchParams.dateTo);
    if (searchParams.dateTo && searchParams.dateFrom && !isDateFromGreaterThanDateTo) {
        const { voucherData, openingBalance } = await getLedgerData(searchParams);
        const { updatedTransactions, totalReceipt, totalPayment, balance } =
            calculateBalance(openingBalance.balance, voucherData);

        return <div>
            <h1 className="text-sm text-center bg-green-200 p-1 font-bold">Ledger</h1>
            <LedgerForm />
            <LedgerTable searchParams={searchParams} openingBalance={openingBalance} updatedTransactions={updatedTransactions} totalReceipt={totalReceipt} totalPayment={totalPayment} balance={balance} />
        </div>;
    } else {
        return <div>
            <h1 className="text-sm text-center bg-green-200 p-1 font-bold">Ledger</h1>
            <LedgerForm />
            <div className="flex flex-col gap-3 p-5 justify-center items-center">
                {searchParams.accountName == "" && <p className="text-sm text-center bg-red-200 p-1 px-4 font-bold">
                    <AiOutlineWarning className="inline-block mr-2" />
                    Please select account</p>}

                {searchParams.dateFrom == "" && <p className="text-sm text-center bg-red-200 p-1 px-4 font-bold">
                    <AiOutlineWarning className="inline-block mr-2" />
                    Please select date From</p>}

                {searchParams.dateTo == "" && <p className="text-sm text-center bg-red-200 p-1 px-4 font-bold">
                    <AiOutlineWarning className="inline-block mr-2" />
                    Please select date To</p>}
                {searchParams.dateFrom && searchParams.dateTo && new Date(searchParams.dateFrom) > new Date(searchParams.dateTo) && (
                    <p className="text-sm text-center bg-red-200 p-1 px-4 font-bold">
                        <AiOutlineWarning className="inline-block mr-2" />
                        Date From cannot be greater than Date To
                    </p>
                )}

            </div>
        </div>
    }
}
