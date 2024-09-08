import { getUserData } from "@/lib/admin";
import React from "react";
import UserTable from "../_component/UserTable";

export default async function UsersList() {
  const userData = await getUserData();
  console.log("userData", userData);
  return (
    <div>
      <UserTable users={userData} />
    </div>
  );
}
