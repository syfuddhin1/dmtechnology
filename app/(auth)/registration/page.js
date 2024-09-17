"use client";
import { addUserClient, loginUser } from "@/lib";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";


const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await addUserClient(formData);
      if (response.success) {
        console.log(response);
        await loginUser(formData);
        // router.push("/login");
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
    }
  };
  return (
    <form className="flex flex-col gap-4 p-10 px-20" onSubmit={handleSubmit}>
      <div className="w-full items-center flex justify-center">
        <Image src="/dmlogo.png" alt="DM Technology" width={150} height={200} />
      </div>
      <h1 className="text-center text-xl font-bold  py-2 font-mono border-b-2">
        Registration Form
      </h1>
      {error && <p className="text-red-500 bg-red-100 p-1 rounded-md text-center">{error}</p>}
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
export default RegisterPage;
