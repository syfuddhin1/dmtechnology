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

    const totalCreditForMonth = getTotal(creditAccountTotalsForMonth);
    const totalCreditForYear = getTotal(creditAccountTotalsForYear);

    const debitAccountsForMonth = calculateDebitAccountTotals(
      paymentVoucherDataForMonth
    );
    const debitAccountsForYear = calculateDebitAccountTotals(
      paymentVoucherDataForYear
    );
    const totalDebitForMonth = getTotal(debitAccountsForMonth);
    const totalDebitForYear = getTotal(debitAccountsForYear);

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

function getTotal(data) {
  return Object.values(data).reduce((acc, curr) => acc + curr, 0);
}
