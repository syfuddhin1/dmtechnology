"use server";
import { auth } from "@/auth";
import { dayModel } from "@/models/day-model";
import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";
import { redirect } from "next/navigation";
import { replaceMongoIdInArraySingle } from "@/utils/data-utils";

export async function getUserNameAndCode() {
  await connectMongo(); // Connect to MongoDB

  const session = await auth();
  const name = session?.user?.name;
  if (!name) {
    redirect("/login");
    throw new Error("User not authenticated");
  }

  try {
    // Find only users with role 'user' and select only 'name' and 'code' fields
    const userData = await userModel
      .find({ name: { $in: zonedata[name] } }, { name: 1, code: 1, _id: 0 })
      .lean();
    return userData; // Return the filtered user data
  } catch (error) {
    console.error("Error getting user data:", error.message);
    return null;
  }
}

export async function getDateData() {
  await connectMongo();

  try {
    const session = await auth();
    const name = session?.user?.name;
    if (!name) {
      redirect("/login");
      throw new Error("User not authenticated");
    }

    // Check if data for the user exists based on the array of codes
    let dayData = await dayModel
      .find({
        name: { $in: zonedata[name] }, // Filter based on array of codes
      })
      .lean()
      .sort({ date: -1 });

    if (!dayData || dayData.length === 0) {
      throw new Error("No data found for the specified codes");
    }

    return replaceMongoIdInArraySingle(dayData);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getVoucherDataByDate(date, branch, voucherType) {
  await connectMongo();
  try {
    const session = await auth();
    const name = session?.user?.name;
    if (!name) {
      redirect("/login");
    }
    const query = {
      date: new Date(date),
    };
    // Only add voucherType to the query if it is defined
    if (voucherType) {
      query.voucherType = voucherType;
    }
    if (branch) {
      query.branch = branch;
    } else {
      query.branch = { $in: zonedata[name] };
    }
    const voucherData = await voucherModel.find(query).lean();

    return {
      status: "success",
      voucherData: replaceMongoIdInArraySingle(voucherData),
    };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
  }
}

// report page
import { getStartDates } from "@/utils/getStartDate";
import {
  calculateCreditAccountTotals,
  calculateDebitAccountTotals,
} from "@/utils/";
import { voucherModel } from "@/models/voucher-modal";
import { addDate } from "./crud";
import { zonedata } from "./zoneList";

export async function getRPReportData(date, branch) {
  await connectMongo();

  try {
    const session = await auth();
    const name = session?.user?.name;
    if (!name) {
      redirect("/login");
    }
    const dateList = getStartDates(date);
    const endDate = new Date(date); // Last day of the current month

    // Create query for the current month
    const queryForMonth = {
      ...(branch ? { branch } : { branch: { $in: zonedata[name] } }),
      date: {
        $gte: dateList.firstOfMonth,
        $lte: endDate,
      },
    };

    // Create query for the fiscal year
    const queryForYear = {
      ...(branch ? { branch } : { branch: { $in: zonedata[name] } }), // Use branch if provided, else use name
      date: {
        $gte: dateList.fiscalYearStart,
        $lte: endDate,
      },
    };

    const receiptVoucherDataForMonth = await voucherModel
      .find({ ...queryForMonth, voucherType: "receipt" })
      .lean();
    const receiptVoucherDataForYear = await voucherModel
      .find({ ...queryForYear, voucherType: "receipt" })
      .lean();

    const paymentVoucherDataForMonth = await voucherModel.find({
      ...queryForMonth,
      voucherType: "payment",
    });
    const paymentVoucherDataForYear = await voucherModel.find({
      ...queryForYear,
      voucherType: "payment",
    });
    const creditAccountTotalsForMonth = calculateCreditAccountTotals(
      receiptVoucherDataForMonth
    );
    const creditAccountTotalsForYear = calculateCreditAccountTotals(
      receiptVoucherDataForYear
    );

    const totalCreditForMonth = getTotalForRp(creditAccountTotalsForMonth);
    const totalCreditForYear = getTotalForRp(creditAccountTotalsForYear);

    const debitAccountsForMonth = calculateDebitAccountTotals(
      paymentVoucherDataForMonth
    );
    const debitAccountsForYear = calculateDebitAccountTotals(
      paymentVoucherDataForYear
    );
    const totalDebitForMonth = getTotalForRp(debitAccountsForMonth);
    const totalDebitForYear = getTotalForRp(debitAccountsForYear);

    return {
      date: dateList,
      receipt: {
        month: creditAccountTotalsForMonth,
        year: creditAccountTotalsForYear,
        totalCreditForMonth,
        totalCreditForYear,
      },
      payment: {
        month: debitAccountsForMonth,
        year: debitAccountsForYear,
        totalDebitForMonth,
        totalDebitForYear,
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export async function getIncomeStatementData(date, branch) {
  await connectMongo();
  try {
    const session = await auth();
    const name = session?.user?.name;
    if (!name) {
      redirect("/login");
    }

    // Get the start and end dates for the current month
    const dateList = getStartDates(date);
    const startDate = new Date(dateList.firstOfMonth); // Start of the month
    const endDate = new Date(date); // End of the month

    // Define the aggregation pipeline
    const receiptMonthPipeline = [
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          voucherType: "receipt",
          ...(branch ? { branch } : { branch: { $in: zonedata[name] } }),
          creditAccounts: { $in: ["104", "105"] },
        },
      },
      {
        $group: {
          _id: "$creditAccounts", // Group by `creditAccounts`
          totalAmount: { $sum: "$amount" }, // Sum the `amount` field
        },
      },
    ];

    const paymentMonthPipeline = [
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          voucherType: "payment",
          ...(branch ? { branch } : { branch: { $in: zonedata[name] } }),
          debitAccounts: { $in: ["106", "107"] },
        },
      },
      {
        $group: {
          _id: "$debitAccounts", // Group by `debitAccounts`
          totalAmount: { $sum: "$amount" }, // Sum the `amount` field
        },
      },
    ];
    // Execute the aggregation pipeline
    const receiptMonthResult = await voucherModel.aggregate(
      receiptMonthPipeline
    );
    const paymentMonthResult = await voucherModel.aggregate(
      paymentMonthPipeline
    );

    const receiptYearPipeline = [
      {
        $match: {
          date: {
            $gte: dateList.fiscalYearStart,
            $lte: endDate,
          },
          voucherType: "receipt",
          ...(branch ? { branch } : { branch: { $in: zonedata[name] } }),
          creditAccounts: { $in: ["104", "105"] },
        },
      },
      {
        $group: {
          _id: "$creditAccounts", // Group by `creditAccounts`
          totalAmount: { $sum: "$amount" }, // Sum the `amount` field
        },
      },
    ];

    const paymentYearPipeline = [
      {
        $match: {
          date: {
            $gte: dateList.fiscalYearStart,
            $lte: endDate,
          },
          voucherType: "payment",
          ...(branch ? { branch } : { branch: { $in: zonedata[name] } }),
          debitAccounts: { $in: ["106", "107"] },
        },
      },
      {
        $group: {
          _id: "$debitAccounts", // Group by `debitAccounts`
          totalAmount: { $sum: "$amount" }, // Sum the `amount` field
        },
      },
    ];
    // Execute the aggregation pipeline
    const receiptYearResult = await voucherModel.aggregate(receiptYearPipeline);
    const paymentYearResult = await voucherModel.aggregate(paymentYearPipeline);

    const totalCreditForMonth =
      calculateTotalAmountForIncome(receiptMonthResult);
    const totalCreditForYear = calculateTotalAmountForIncome(receiptYearResult);
    const totalDebitForMonth =
      calculateTotalAmountForIncome(paymentMonthResult);
    const totalDebitForYear = calculateTotalAmountForIncome(paymentYearResult);

    const thisMonthSurplus = totalCreditForMonth - totalDebitForMonth;
    const thisYearSurplus = totalCreditForYear - totalDebitForYear;

    return {
      date: dateList,
      receipt: {
        month: transformToObject(receiptMonthResult),
        year: transformToObject(receiptYearResult),
        totalCreditForMonth,
        totalCreditForYear,
      },
      payment: {
        month: transformToObject(paymentMonthResult),
        year: transformToObject(paymentYearResult),
        totalDebitForMonth,
        totalDebitForYear,
      },
      surplus: {
        month: thisMonthSurplus,
        year: thisYearSurplus,
      },
    };
  } catch (error) {
    console.error("Error fetching income statement data:", error);
    throw error; // Re-throw the error after logging
  }
}
export async function getSurplusData(
  endDate,
  branch,
  startDate = "2022-01-01"
) {
  await connectMongo();
  try {
    const session = await auth();
    const name = session?.user?.name;
    if (!name) {
      redirect("/login");
    }

    // Get the start and end dates for the current month
    const startDateForSurplus = new Date(startDate); // Start of the month
    const endDateForSurplus = new Date(endDate); // End of the month

    const receiptYearPipeline = [
      {
        $match: {
          date: {
            $gte: startDateForSurplus,
            $lte: endDateForSurplus,
          },
          voucherType: "receipt",
          ...(branch ? { branch } : { branch: { $in: zonedata[name] } }),
          creditAccounts: { $in: ["104", "105"] },
        },
      },
      {
        $group: {
          _id: "$creditAccounts", // Group by `creditAccounts`
          totalAmount: { $sum: "$amount" }, // Sum the `amount` field
        },
      },
    ];

    const paymentYearPipeline = [
      {
        $match: {
          date: {
            $gte: startDateForSurplus,
            $lte: endDateForSurplus,
          },
          voucherType: "payment",
          ...(branch ? { branch } : { branch: { $in: zonedata[name] } }),
          debitAccounts: { $in: ["106", "107"] },
        },
      },
      {
        $group: {
          _id: "$debitAccounts", // Group by `debitAccounts`
          totalAmount: { $sum: "$amount" }, // Sum the `amount` field
        },
      },
    ];
    // Execute the aggregation pipeline
    const receiptYearResult = await voucherModel.aggregate(receiptYearPipeline);
    const paymentYearResult = await voucherModel.aggregate(paymentYearPipeline);

    const totalCreditForYear = calculateTotalAmountForIncome(receiptYearResult);
    const totalDebitForYear = calculateTotalAmountForIncome(paymentYearResult);

    const thisYearSurplus = totalCreditForYear - totalDebitForYear;

    return thisYearSurplus;
  } catch (error) {
    console.error("Error fetching income statement data:", error);
    throw error; // Re-throw the error after logging
  }
}
export async function getBalanceSheetData(date, branch) {
  await connectMongo();
  try {
    const session = await auth();
    const name = session?.user?.name;
    if (!name) {
      redirect("/login");
    }

    // Get the start and end dates for the current month
    const dateList = getStartDates(date);
    const startDate = new Date("2022-07-01"); // Start of the month
    const endDate = new Date(date); // End of the month
    const currentYearReceiptPipeline = [
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          ...(branch ? { branch } : { branch: { $in: zonedata[name] } }),
          creditAccounts: { $in: ["101", "102", "103"] },
        },
      },
      {
        $group: {
          _id: "$creditAccounts", // Group by `creditAccounts`
          totalAmount: { $sum: "$amount" }, // Sum the `amount` field
        },
      },
    ];

    const currentYearPaymentPipeline = [
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          ...(branch ? { branch } : { branch: { $in: zonedata[name] } }),
          debitAccounts: { $in: ["101", "102", "103"] },
        },
      },
      {
        $group: {
          _id: "$debitAccounts", // Group by `creditAccounts`
          totalAmount: { $sum: "$amount" }, // Sum the `amount` field
        },
      },
    ];

    // Execute the aggregation pipeline
    const currentYearReceiptResult = await voucherModel.aggregate(
      currentYearReceiptPipeline
    );
    const currentYearPaymentResult = await voucherModel.aggregate(
      currentYearPaymentPipeline
    );

    const prevYearReceiptPipeline = [
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: dateList.prevYearEnd,
          },
          ...(branch ? { branch } : { branch: { $in: zonedata[name] } }),
          creditAccounts: { $in: ["101", "102", "103"] },
        },
      },
      {
        $group: {
          _id: "$creditAccounts", // Group by `creditAccounts`
          totalAmount: { $sum: "$amount" }, // Sum the `amount` field
        },
      },
    ];
    const prevYearPaymentPipeline = [
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: dateList.prevYearEnd,
          },
          ...(branch ? { branch } : { branch: { $in: zonedata[name] } }),
          debitAccounts: { $in: ["101", "102", "103"] },
        },
      },
      {
        $group: {
          _id: "$debitAccounts", // Group by `creditAccounts`
          totalAmount: { $sum: "$amount" }, // Sum the `amount` field
        },
      },
    ];

    const prevYearReceiptResult = await voucherModel.aggregate(
      prevYearReceiptPipeline
    );
    const prevYearPaymentResult = await voucherModel.aggregate(
      prevYearPaymentPipeline
    );
    const transformReceiptResult = transformToObject(currentYearReceiptResult);
    const transformPaymentResult = transformToObject(currentYearPaymentResult);

    const transformPrevYearReceiptResult = transformToObject(
      prevYearReceiptResult
    );
    const transformPrevYearPaymentResult = transformToObject(
      prevYearPaymentResult
    );
    const currentYearBalanceData = {
      101: subtract(
        transformPaymentResult["101"],
        transformReceiptResult["101"]
      ),
      102: subtract(
        transformPaymentResult["102"],
        transformReceiptResult["102"]
      ),
      103: subtract(
        transformPaymentResult["103"],
        transformReceiptResult["103"]
      ),
    };

    const prevYearBalanceData = {
      101: subtract(
        transformPrevYearPaymentResult["101"],
        transformPrevYearReceiptResult["101"]
      ),
      102: subtract(
        transformPrevYearPaymentResult["102"],
        transformPrevYearReceiptResult["102"]
      ),
      103: subtract(
        transformPrevYearPaymentResult["103"],
        transformPrevYearReceiptResult["103"]
      ),
    };
    console.log(
      subtract(
        transformPrevYearPaymentResult["103"],
        transformPrevYearReceiptResult["103"]
      )
    );
    const currentYearTotal = getTotalForRp(currentYearBalanceData, branch);
    const prevYearTotal = getTotalForRp(prevYearBalanceData, branch);
    const thisYearSurplus = await getSurplusData(endDate, branch);
    const prevYearSurplus = await getSurplusData(dateList.prevYearEnd, branch);

    return {
      thisYear: {
        balanceData: currentYearBalanceData,
        total: currentYearTotal,
        surplus: thisYearSurplus,
      },
      prevYear: {
        balanceData: prevYearBalanceData,
        total: prevYearTotal,
        surplus: prevYearSurplus,
      },
      date: dateList,
    };
  } catch (error) {
    console.error("Error fetching income statement data:", error);
    throw error; // Re-throw the error after logging
  }
}
function getTotalForRp(data) {
  return Object.values(data).reduce((acc, curr) => acc + curr, 0);
}

function calculateTotalAmountForIncome(data) {
  return data.reduce((total, item) => total + item.totalAmount, 0);
}

function transformToObject(data) {
  return data.reduce((acc, item) => {
    acc[item._id] = item.totalAmount;
    return acc;
  }, {});
}

function subtract(a, b) {
  if (isNaN(a)) {
    a = 0;
  }
  if (isNaN(b)) {
    b = 0;
  }
  return a - b;
}
