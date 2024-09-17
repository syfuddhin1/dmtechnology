import { getUserData } from "@/lib/admin";
import React from "react";
import UserTable from "../_component/UserTable";

export default async function UsersList({ params, searchParams }) {
  const userData = await getUserData({ ...searchParams });
  const zoneUsers =await getUserData({q: 'super'});

  return (
    <div>
      <UserTable users={userData} zoneUsers={zoneUsers} />
    </div>
  );
}
