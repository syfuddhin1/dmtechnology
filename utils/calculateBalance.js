export const calculateBalance = (openingBalance, vouchers) => {
  let balance = openingBalance;
  let totalReceipt = 0;
  let totalPayment = 0;

  const updatedTransactions = vouchers.map((transaction) => {
    const amount = parseFloat(transaction.amount);
    if (transaction.voucherType === "receipt") {
      balance += amount;
      totalReceipt += amount;
    } else if (transaction.voucherType === "payment") {
      balance -= amount;
      totalPayment += amount;
    }
    return { ...transaction, balance: balance };
  });

  return { updatedTransactions, totalReceipt, totalPayment, balance };
};
