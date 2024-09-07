import { auth } from "@/auth";
import React from "react";

export default async function IncomeStateMentPage() {
  const session = await auth();
  console.log("session", session);
  return <div>IncomeStateMentPage</div>;
}
