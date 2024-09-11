export function calculateDateDifference(date1, date2) {
  // Convert both dates to Date objects if they aren't already
  const d1 = new Date(date1);
  const d2 = new Date();

  // Get the difference in time (in milliseconds)
  const diffTime = Math.abs(d2 - d1);

  // Convert the difference in time to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
