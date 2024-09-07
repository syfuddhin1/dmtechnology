export function getStartDates(inputDate) {
  const date = new Date(inputDate);

  // 1. Get the first day of the current month
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  // 2. Get the fiscal year's first date (July 1st)
  let fiscalYearStart, fiscalYear;
  if (date.getMonth() >= 6) {
    // If the current month is July (6) or later, fiscal year is current year - next year
    fiscalYearStart = new Date(date.getFullYear(), 6, 1);
    fiscalYear = `${date.getFullYear()}-${date.getFullYear() + 1}`;
  } else {
    // If the current month is before July, fiscal year is last year - current year
    fiscalYearStart = new Date(date.getFullYear() - 1, 6, 1);
    fiscalYear = `${date.getFullYear() - 1}-${date.getFullYear()}`;
  }

  return {
    firstOfMonth,
    fiscalYearStart,
    fiscalYear,
  };
}
