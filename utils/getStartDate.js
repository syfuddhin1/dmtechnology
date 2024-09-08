export function getStartDates(inputDate) {
  const date = new Date(inputDate);

  // 1. Get the first day of the current month
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  // 2. Get the fiscal year's first date (July 1st)
  let fiscalYearStart, fiscalYear, prevYearStart, prevYearEnd, prevFiscalYear;
  if (date.getMonth() >= 6) {
    // If the current month is July (6) or later, fiscal year is current year - next year
    fiscalYearStart = new Date(date.getFullYear(), 6, 1);
    prevYearStart = new Date(date.getFullYear() - 1, 6, 1);
    prevYearEnd = new Date(date.getFullYear(), 5, 30);
    fiscalYear = `${date.getFullYear()}-${date.getFullYear() + 1}`;
    prevFiscalYear = `${date.getFullYear() - 1}-${date.getFullYear()}`;
  } else {
    // If the current month is before July, fiscal year is last year - current year
    fiscalYearStart = new Date(date.getFullYear() - 1, 6, 1);
    prevYearStart = new Date(date.getFullYear() - 2, 6, 1);
    prevYearEnd = new Date(date.getFullYear() - 1, 5, 30);
    fiscalYear = `${date.getFullYear() - 1}-${date.getFullYear()}`;
    prevFiscalYear = `${date.getFullYear() - 2}-${date.getFullYear() - 1}`;
  }

  return {
    firstOfMonth,
    fiscalYearStart,
    prevYearStart,
    prevYearEnd,
    fiscalYear,
    prevFiscalYear,
  };
}
