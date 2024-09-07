import { auth } from "@/auth";
import { getDateData } from "@/lib/crud";
import Image from "next/image";
import React from "react";
import LogoutButton from "../auth/LogoutButton";

export default async function NavBar() {
  const session = await auth();
  const workingDate = await getDateData();

  return (
    <nav className="font-bold flex justify-between px-10 p-2 items-center shadow-md capitalize">
      <div>
        <Image src="/dmlogo.png" alt="DM Technology" width={150} height={200} />
      </div>
      <div className="flex gap-20 items-center">
        {session?.user && (
          <p>
            {" "}
            <span className="text-blue-500 font-extrabold">
              Working Date:{" "}
            </span>{" "}
            {workingDate.data}
          </p>
        )}
        <div>
          {session?.user ? (
            <div className="flex gap-2 items-center">
              <p className="font-extrabold tracking-wider">
                {session?.user.name}
              </p>
              <LogoutButton />
            </div>
          ) : (
            <button className="btn">Login</button>
          )}
        </div>
      </div>
    </nav>
  );
}
