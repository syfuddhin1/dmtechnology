"use server";
import { auth } from "@/auth";
import { dayModel } from "@/models/day-model";
import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";
import { redirect } from "next/navigation";
import { replaceMongoIdInArraySingle } from "@/utils/data-utils";
export async function addUser(formData) {
  const connect = await connectMongo();
  if (formData.get("password") !== formData.get("confirmPassword")) {
    return {
      success: false,
      message: "Passwords do not match",
    };
  }
  try {
    // check if user already exists
    const isUserExist = await userModel.findOne({
      email: formData.get("email"),
    });

    if (isUserExist) {
      return {
        success: false,
        message: "User already exists",
      };
    }
    console.log(formData);
    // add new user to database
    const newUser = await userModel.create({
      name: formData.get("name"),
      email: formData.get("email"),
      code: formData.get("code"),
      emailVerified: false,
      role: formData.get("role") || "user",
      password: await bcrypt.hash(formData.get("password"), 5),
    });
    console.log(newUser);
    const addStartingDate = await addDate({
      name: newUser.name,
      email: newUser.email,
      code: newUser.code,
    });
    console.log(addStartingDate);
    redirect("/login");
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (err) {
    if (err.code === 11000) {
      return {
        success: false,
        message: `User already exists with ${
          err.keyValue.email || "your email"
        }. `,
      };
    }
    return {
      success: false,
    };
  }
}
export async function getUserData() {
  try {
    const connect = await connectMongo();
    const userData = await userModel.find().lean();
    return replaceMongoIdInArraySingle(userData);
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
}

export async function getUserNameAndCode() {
  try {
    await connectMongo(); // Connect to MongoDB
    // Find only users with role 'user' and select only 'name' and 'code' fields
    const userData = await userModel
      .find({ role: "user" }, { name: 1, code: 1, _id: 0 })
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
    const code = session?.user?.code;
    if (!code) {
      redirect("/login");
      throw new Error("User not authenticated");
    }

    // Check if an data for the user already exists
    let dayData = await dayModel.find().lean().sort({ date: -1 });

    if (!dayData) {
      throw new Error("No data found for the user");
    }

    return replaceMongoIdInArraySingle(dayData);
  } catch (error) {
    console.error("Error adding  to data:", error);
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

export async function getRPReportData(date, branch) {
  await connectMongo();
  console.log("date server", date);

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
      ...(branch ? { branch } : {}),
      date: {
        $gte: dateList.firstOfMonth,
        $lte: endDate,
      },
    };

    // Create query for the fiscal year
    const queryForYear = {
      ...(branch ? { branch } : {}), // Use branch if provided, else use name
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
          ...(branch ? { branch } : {}),
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
          ...(branch ? { branch } : {}),
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
          ...(branch ? { branch } : {}),
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
          ...(branch ? { branch } : {}),
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
          ...(branch ? { branch } : {}),
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
          ...(branch ? { branch } : {}),
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
          ...(branch ? { branch } : {}),
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
          ...(branch ? { branch } : {}),
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
          ...(branch ? { branch } : {}),
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
          ...(branch ? { branch } : {}),
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
