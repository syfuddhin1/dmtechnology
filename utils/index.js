export function calculateCreditAccountTotals(data) {
  const totals = {};

  data.forEach((item) => {
    const { creditAccounts, amount } = item;

    // If the credit account is already in the totals object, add to the amount
    if (totals[creditAccounts]) {
      totals[creditAccounts] += amount;
    } else {
      // Otherwise, initialize it with the current amount
      totals[creditAccounts] = amount;
    }
  });

  return totals;
}

export function calculateDebitAccountTotals(data) {
  const totals = {};

  data.forEach((item) => {
    const { debitAccounts, amount } = item;

    // If the credit account is already in the totals object, add to the amount
    if (totals[debitAccounts]) {
      totals[debitAccounts] += amount;
    } else {
      // Otherwise, initialize it with the current amount
      totals[debitAccounts] = amount;
    }
  });

  return totals;
}
