import { auth } from "@/auth";
import React from "react";

export default async function RPPage() {
  const session = await auth();
  console.log("session", session);
  return <div>RPPage</div>;
}
