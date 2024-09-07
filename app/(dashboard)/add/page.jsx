import { auth } from "@/auth";
import React from "react";

export default async function AddVoucher() {
  const session = await auth();
  console.log("session", session);
  return <div>AddVoucher</div>;
}
