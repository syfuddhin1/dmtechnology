export default function LedgerTable() {
    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">SL</th>
                    <th className="border border-gray-300 p-2">Accounts Head</th>
                    <th className="border border-gray-300 p-2">Code</th>
                    <th className="border border-gray-300 p-2">Debit</th>
                    <th className="border border-gray-300 p-2">Credit</th>
                    <th className="border border-gray-300 p-2">DR/CR</th>
                    <th className="border border-gray-300 p-2">Balance</th>
                </tr>
            </thead>
            <tbody>
                {/* Table rows will be populated here */}
            </tbody>
        </table>
    );
}