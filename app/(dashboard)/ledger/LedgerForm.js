
"use client";

import { Accounts } from "@/services/data";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LedgerForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        accountName: searchParams.get('accountName') || '',
        dateFrom: searchParams.get('dateFrom') || '',
        dateTo: searchParams.get('dateTo') || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(formData);
        router.push(`/ledger?${params.toString()}`);
    };

    return <form onSubmit={handleSubmit} className="flex xl:flex-row flex-col justify-center items-center xl:gap-4 xl:px-4 text-xs gap-2">

        <label htmlFor="accountName" className="block text-gray-700">Account Name</label>
        <select
            id="accountName"
            name="accountName"
            value={formData.accountName}
            onChange={handleInputChange}
            className="mt-1 block w-full xl:w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
            <option value="">Select an account</option>
            {Accounts.slice(1, 11).map((account) => (
                <option key={account.code} value={account.code}>{account.name}</option>
            ))}
        </select>

        <label htmlFor="dateFrom" className="block text-gray-700">Date From</label>
        <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            value={formData.dateFrom}
            onChange={handleInputChange}
            className="mt-1 block w-full xl:w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />

        <label htmlFor="dateTo" className="block text-gray-700">Date To</label>
        <input
            type="date"
            id="dateTo"
            name="dateTo"
            value={formData.dateTo}
            onChange={handleInputChange}
            className="mt-1 block w-full xl:w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />

        <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
            Show Ledger
        </button>

    </form>;
}