import { auth } from "@/auth";
import React from "react";

export default async function BalanceSheetPage() {
  const session = await auth();
  console.log("session", session);
  return <div>BalanceSheetPage</div>;
}
