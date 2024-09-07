"use server";
import { auth } from "@/auth";
import { branchModel } from "@/models/branch-model";
import { dayModel } from "@/models/day-model";
import { voucherModel } from "@/models/voucher-modal";
import connectMongo from "@/services/mongo";
import {
  replaceMongoIdInArray,
  replaceMongoIdInArraySingle,
  replaceMongoIdInObject,
  replaceMongoIdInObjectSingle,
} from "@/utils/data-utils";
import { formatDate } from "@/utils/formatDate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addDate(user) {
  await connectMongo();
  try {
    // update day data date
    const isUserExist = await dayModel.findOne({
      email: user.email,
    });

    if (isUserExist) {
      return {
        success: false,
        message: "User already exists",
      };
    }
    // update day data date
    const dayData = await dayModel.create({
      ...user,
      date: new Date("2024-06-30"),
    });

    return { status: "success", dayData: dayData };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
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
    let dayData = await dayModel.findOne({ code });

    if (!dayData) {
      throw new Error("No data found for the user");
    }

    return { status: "success", data: formatDate(dayData.date) };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
  }
}
export async function updateDate() {
  await connectMongo();
  try {
    const session = await auth();
    const code = session?.user?.code;
    if (!code) {
      throw new Error("User not authenticated");
    }

    // Check if an data for the user already exists
    let dayData = await dayModel.findOne({ code });
    if (!dayData) {
      throw new Error("No data found for the user");
    }
    // update day data date
    dayData = await dayModel.findOneAndUpdate(
      { code },
      { date: new Date(dayData.date + 1) },
      { new: true }
    );

    return { status: "success", dayData: dayData };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
  }
}

// write add get and update function for branches
export async function addBranchInfoByDate(data) {
  await connectMongo();
  try {
    // update day data date
    const isDataExist = await branchModel.findOne({
      name: data.name,
      date: data.date,
    });

    if (isDataExist) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const branchData = await branchModel.create(data);
    // Start with the branchData date
    let oneDayAhead = new Date(data.date);

    // Increment the date until it's not Friday or Saturday

    // 5 = Friday, 6 = Saturday
    if (oneDayAhead.getDay() === 5 || oneDayAhead.getDay() === 6) {
      oneDayAhead.setDate(oneDayAhead.getDate() + 3);
    } else {
      oneDayAhead.setDate(oneDayAhead.getDate() + 1); // Add one day
    }
    // Update the document with the new date
    const updateDayData = await dayModel.findOneAndUpdate(
      { code: data.code },
      { $set: { date: oneDayAhead } }, // Update the entire date array
      { new: true }
    );
    revalidatePath("/");
    return {
      status: "success",
      // branchData: replaceMongoIdInObjectSingle(branchData),
    };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
  }
}

export async function getBranchDataByDate(date) {
  await connectMongo();
  try {
    const session = await auth();
    const code = session?.user?.code;
    if (!code) {
      redirect("/login");
    }

    // Check if an data for the user already exists
    let branchData = await branchModel.findOne({
      email: session?.user?.email,
      date,
    });

    if (!branchData) {
      throw new Error("No data found for the user");
    }

    return {
      status: "success",
      data: replaceMongoIdInObjectSingle(branchData.date),
    };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
  }
}

export async function getBranchData() {
  await connectMongo();
  try {
    const session = await auth();
    const code = session?.user?.code;
    if (!code) {
      redirect("/login");
    }

    // Check if an data for the user already exists
    let branchData = await branchModel
      .find()
      .lean()
      .sort({ date: -1 })
      .limit(25);
    if (!branchData) {
      throw new Error("No data found for the user");
    }

    return { status: "success", data: replaceMongoIdInArraySingle(branchData) };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
  }
}

export async function deleteDayEndData(id) {
  await connectMongo();
  try {
    const session = await auth();
    const code = session?.user?.code;
    if (!code) {
      redirect("/login");
    }

    const branchData = await branchModel.findOne({ _id: id });
    if (!branchData) {
      throw new Error(`No document found with id: ${id}`);
    }

    console.log("deleteDayEndData", id);
    await branchModel.findOneAndDelete({ _id: id });

    const oneDayBehind = new Date(branchData.date);

    // Increment the date until it's not Friday or Saturday
    let oneDayAhead = new Date(oneDayBehind);

    if (oneDayAhead.getDay() === 5 || oneDayAhead.getDay() === 6) {
      oneDayAhead.setDate(oneDayAhead.getDate() - 3);
    } else {
      oneDayAhead.setDate(oneDayAhead.getDate() - 1); // Add one day
    }

    // Update the document with the new date
    const updateDayData = await dayModel.findOneAndUpdate(
      { code: branchData.code },
      { $set: { date: oneDayBehind } }, // Update the entire date array
      { new: true }
    );

    if (!updateDayData) {
      throw new Error(`Failed to update day data with id: ${branchData.code}`);
    }

    revalidatePath("/");
    return { status: "success" };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
  }
}

export async function addVoucher(data) {
  await connectMongo();
  try {
    const session = await auth();
    const code = session?.user?.code;
    if (!code) {
      redirect("/login");
    }
    // console.log("addVoucher", data);
    const voucherData = await voucherModel.create({ ...data, code });
    revalidatePath("/add");
    return {
      status: "success",
      // voucherData: replaceMongoIdInObject(voucherData),
    };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
  }
}

export async function getVoucherData() {
  await connectMongo();
  try {
    const session = await auth();
    const name = session?.user.name;
    if (!name) {
      redirect("/login");
    }
    // console.log("addVoucher", data);
    const voucherData = await voucherModel.find({ branch: name }).lean();

    // write a function to make a group of voucher data based on  voucher code
    const groupedVoucherDataWithTotal = groupByVoucherCode(
      replaceMongoIdInArraySingle(voucherData),
      "voucherCode",
      "amount"
    );

    // Group by function to group the data and sum the amounts based on a specific property
    function groupByVoucherCode(arr, key, amountKey) {
      const result = arr.reduce((acc, currentItem) => {
        const groupKey = currentItem[key];
        const existingGroup = acc.find((item) => item[key] === groupKey);

        if (existingGroup) {
          // If the voucherCode already exists, sum the amounts
          existingGroup[amountKey] += currentItem[amountKey];
        } else {
          // If the voucherCode doesn't exist, create a new entry
          acc.push({
            [key]: groupKey,
            [amountKey]: currentItem[amountKey],
            date: currentItem.date,
            voucherType: currentItem.voucherType,
            branch: currentItem.branch,
          });
        }

        return acc;
      }, []);

      return result;
    }
    // console.log(groupedVoucherDataWithTotal);
    // console.log("voucherData", voucherData);
    return {
      status: "success",
      voucherData: groupedVoucherDataWithTotal,
    };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
  }
}

export async function getVoucherDataById(voucherCode) {
  await connectMongo();
  try {
    const session = await auth();
    const name = session?.user.name;
    if (!name) {
      redirect("/login");
    }
    const voucherData = await voucherModel.find({ voucherCode }).lean();
    return {
      status: "success",
      voucherData: replaceMongoIdInArraySingle(voucherData),
    };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
  }
}

export async function getVoucherDataByDate(date, voucherType) {
  await connectMongo();
  try {
    const session = await auth();
    const name = session?.user?.name;
    if (!name) {
      redirect("/login");
    }
    const query = {
      branch: name,
      date: new Date(date),
    };
    // Only add voucherType to the query if it is defined
    if (voucherType) {
      query.voucherType = voucherType;
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

export async function deleteVoucher(id) {
  await connectMongo();
  try {
    const session = await auth();
    const code = session?.user?.code;
    if (!code) {
      redirect("/login");
    }
    // console.log("addVoucher", data);
    const voucherData = await voucherModel.deleteOne({ _id: id });
    revalidatePath("/add");
    return {
      status: "success",
      // voucherData: replaceMongoIdInObject(voucherData),
    };
  } catch (error) {
    console.error("Error adding  to data:", error);
    throw error;
  }
}

// report area

import { getStartDates } from "@/utils/getStartDate";
import {
  calculateCreditAccountTotals,
  calculateDebitAccountTotals,
} from "@/utils/";

export async function getRPReportData(date) {
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

    const queryForMonth = {
      branch: name,
      date: {
        $gte: dateList.firstOfMonth,
        $lte: endDate,
      },
    };

    const queryForYear = {
      branch: name,
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

export async function getIncomeStatementData(date) {
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
          branch: name,
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
          branch: name,
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
          branch: name,
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
          branch: name,
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
export async function getSurplusData(endDate, startDate = "2022-01-01") {
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
          branch: name,
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
          branch: name,
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
export async function getBalanceSheetData(date) {
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
          branch: name,
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
          branch: name,
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
          branch: name,
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
          branch: name,
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
      101: transformPaymentResult["101"] - transformReceiptResult["101"] || 0,
      102: transformPaymentResult["102"] - transformReceiptResult["102"] || 0,
      103: transformPaymentResult["103"] - transformReceiptResult["103"] || 0,
    };

    const prevYearBalanceData = {
      101:
        transformPrevYearPaymentResult["101"] -
          transformPrevYearReceiptResult["101"] || 0,
      102:
        transformPrevYearPaymentResult["102"] -
          transformPrevYearReceiptResult["102"] || 0,
      103:
        transformPrevYearPaymentResult["103"] -
          transformPrevYearReceiptResult["103"] || 0,
    };
    const currentYearTotal = getTotalForRp(currentYearBalanceData);
    const prevYearTotal = getTotalForRp(prevYearBalanceData);
    const thisYearSurplus = await getSurplusData(endDate);
    const prevYearSurplus = await getSurplusData(dateList.prevYearEnd);

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
