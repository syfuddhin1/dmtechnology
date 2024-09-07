"use client";
import { useState } from "react";
import { Accounts } from "@/services/data";
import { addVoucher } from "@/lib/crud";

export default function Form({ voucherType, user, date }) {
  const [formData, setFormData] = useState({
    date: date,
    branch: user.name,
    voucherCode: generateVoucherCode(
      (user = { ...user, date: date }),
      voucherType
    ),
    voucherType: voucherType,
    creditAccounts: voucherType == "payment" ? 108 : "",
    debitAccounts: voucherType == "receipt" ? 108 : "",
    amount: "",
    narration: "-",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addVoucher(formData);
    } catch (error) {
      console.error("Error adding voucher: ", error);
      // alert("Failed to add voucher.");
    }
  };

  return (
    <>
      <form
        className={"addform grid grid-cols-3 gap-4 w-[70vw]"}
        onSubmit={handleSubmit}
      >
        <label>
          <p>Date</p>
          <input
            type={"date"}
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            disabled={"true"}
          />
        </label>

        <label className={"none"}>
          <p>Voucher Code</p>
          <input
            type={"text"}
            name="voucherCode"
            value={formData.voucherCode}
            onChange={handleChange}
            required
          />
        </label>
        <label className={"none"}>
          <p>Voucher Type</p>
          <input
            type={"text"}
            name="voucherType"
            value={formData.voucherType}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p>Credit Accounts</p>
          <select
            name="creditAccounts"
            value={formData.creditAccounts}
            onChange={handleChange}
            required
            disabled={voucherType === "payment"}
          >
            <option>Select An option</option>
            {Accounts.map((account) => (
              <option value={account.code} key={account.code}>
                {account.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <p>Debit Accounts</p>
          <select
            name="debitAccounts"
            value={formData.debitAccounts}
            onChange={handleChange}
            required
            disabled={voucherType === "receipt"}
          >
            <option>Select An option</option>
            {Accounts.map((account) => (
              <option value={account.code} key={account.code}>
                {account.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <p>Amount</p>
          <input
            type={"number"}
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="amount"
          />
        </label>
        <label className={"col-span-2"}>
          <p>Narration</p>
          <input
            type={"text"}
            name="narration"
            value={formData.narration}
            onChange={handleChange}
            required={false}
            placeholder="Narration"
          />
        </label>
        <div className={"w-full mt-1"}>
          <button className={"add"} type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
}

const generateVoucherCode = (branchDetails, voucher) => {
  // Get the current date and time
  const voucherType = voucher == "payment" ? "PV" : "RV";
  // Format the voucher code
  const voucherCode = `${voucherType}-${branchDetails.code}-${branchDetails.date}`;

  return voucherCode;
};
