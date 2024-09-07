export const formatDate = (date) => {
  if (date === null || date === undefined) {
    throw new Error("Date is null or undefined");
  }

  const dateString = date.toLocaleDateString("en-CA");
  if (dateString === "Invalid Date") {
    throw new Error("Invalid date");
  }

  return dateString;
};
