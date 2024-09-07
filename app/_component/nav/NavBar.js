import { auth } from "@/auth";
import { getDateData } from "@/lib/crud";
import Image from "next/image";
import React from "react";
import LogoutButton from "../auth/LogoutButton";
import {
  AiFillClockCircle,
  AiOutlineClockCircle,
  AiOutlineGlobal,
} from "react-icons/ai";

export default async function NavBar() {
  const session = await auth();
  const workingDate = await getDateData();

  return (
    <nav className="font-bold flex justify-between px-10 p-2 items-center shadow-md capitalize">
      <div>
        <Image src="/dmlogo.png" alt="DM Technology" width={200} height={200} />
      </div>
      <div className="flex gap-10 items-center">
        {session?.user && (
          <div className="flex gap-2 text-md">
            <span className="text-blue-500 font-extrabold">
              <AiOutlineClockCircle className="text-xl" />
            </span>{" "}
            {dayJson[new Date(workingDate.data).getDay()]}, {workingDate.data}
          </div>
        )}
        <div>
          {session?.user ? (
            <div className="flex gap-2 items-center">
              <AiOutlineGlobal className="text-xl text-blue-600" /> Branch:
              <p className="tracking-wider text-blue-950">
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

const dayJson = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
