"use server";
import { signIn } from "@/auth";
import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";
import { replaceMongoIdInObject } from "@/utils/data-utils";
import bcrypt from "bcryptjs";

export async function addUser(formData) {
  const connect = await connectMongo();
  if (formData.get("password") !== formData.get("confirmPassword")) {
    return {
      success: false,
      message: "Passwords do not match",
    };
  }
  try {
    const newUser = await userModel.create({
      name: formData.get("name"),
      email: formData.get("email"),
      code: formData.get("code"),
      emailVerified: false,
      role: "user",
      password: await bcrypt.hash(formData.get("password"), 5),
    });

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
export async function loginUser(formData) {
  // console.log("user", formData);

  try {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      // redirectTo: "/",
      redirect: false,
    });
    return res;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}

export async function getUserData(id) {
  try {
    const connect = await connectMongo();
    const userData = await userModel.findById(id).lean();
    return replaceMongoIdInObject(userData);
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
}

export async function updateUserData(id, data) {
  try {
    const connect = await connectMongo();
    const userData = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating user data:", error);
    return {
      success: false,
    };
  }
}
