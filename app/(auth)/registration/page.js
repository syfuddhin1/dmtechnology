import { addUser } from "@/lib";
import Image from "next/image";
import React from "react";

export default function RegistrationPage() {
  return (
    <form className="flex flex-col gap-4 p-10 px-20" action={addUser}>
      <div className="w-full items-center flex justify-center">
        <Image src="/dmlogo.png" alt="DM Technology" width={150} height={200} />
      </div>
      <h1 className="text-center text-xl font-bold  py-2 font-mono border-b-2">
        Registration Form
      </h1>
      <div className="flex flex-col gap-2 justify-center items-center text-xs">
        <label>
          Email
          <input name="email" type="email" />
        </label>

        <label>
          Name
          <input name="name" type="text" />
        </label>
        <label>
          Code
          <input name="code" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <label>
          Confirm Password
          <input name="confirmPassword" type="password" />
        </label>

        <button className="text-xs h-8 px-16 mt-2">Register</button>
      </div>
    </form>
  );
}
