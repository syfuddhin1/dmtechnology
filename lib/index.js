"use server";
import { signIn, signOut } from "@/auth";
import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";
import { replaceMongoIdInObject } from "@/utils/data-utils";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { addDate } from "./crud";

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

    // add new user to database
    const newUser = await userModel.create({
      name: formData.get("name"),
      email: formData.get("email"),
      code: formData.get("code"),
      emailVerified: false,
      role: formData.get("role") || "user",
      password: await bcrypt.hash(formData.get("password"), 5),
    });

    const addStartingDate = await addDate({
      name: newUser.name,
      email: newUser.email,
      code: newUser.code,
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
  const res = await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Check if login was successful
  if (res?.ok) {
    // Redirect to home or dashboard after successful login
    return { success: true };
  } else {
    // Handle error (e.g., display error message)
    console.error("Login failed:", res?.error);
    return { error: res?.error || "Login failed" };
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

export async function Logout() {
  await signOut();
  redirect("/login");
}
