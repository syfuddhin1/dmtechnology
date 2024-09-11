import { getUserData } from "@/lib/admin";
import { getDateData } from "@/lib/admin";
import { calculateDateDifference } from "@/utils/calculatedDays";
import React from "react";
export default async function AdminPanel({ params, searchParams }) {
  const users = await getUserData(searchParams);
  const usersDate = await getDateData(searchParams);
  const updatedUser = usersDate
    .map((user) => {
      return calculateDateDifference(user.date) < 5 ? 1 : 0;
    })
    .reduce((a, b) => a + b, 0);
  const superusers = await getUserData({ q: "super" });
  return (
    <div>
      <h1 className="text-center py-2 bg-green-200 text-sm rounded-sm">
        Dashboard
      </h1>
      <div className="grid grid-cols-3 gap-2 text-center mt-2">
        <section>
          <h2 className="bg-yellow-300 py-2">Total Users</h2>
          <div className="text-center text-5xl bg-green-300 p-2">
            {users.length}
          </div>
        </section>
        <section>
          <h2 className="bg-yellow-300 py-2">Total Updated User</h2>
          <div className="text-center text-5xl bg-green-300 p-2">
            {updatedUser}
          </div>
        </section>
        <section className="text-center">
          <h2 className="bg-yellow-300 p-2">Super Admins</h2>
          {superusers.map((user) => (
            <div className="p-2 bg-pink-200 border" key={user.code}>
              {user.name}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
