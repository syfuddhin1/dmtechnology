import { loginUser } from "@/lib";
import Image from "next/image";

export default function SignIn() {
  return (
    <form action={loginUser} className="flex flex-col gap-5 p-20">
      <div className="w-full items-center flex justify-center">
        <Image src="/dmlogo.png" alt="DM Technology" width={150} height={200} />
      </div>
      <h1 className="text-center text-md font-bold  py-2 font-mono border-b-2">
        Login Form
      </h1>
      <div className="flex flex-col text-xs gap-4 justify-center items-center">
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button className="text-xs h-8 px-16 ">Sign In</button>
      </div>
    </form>
  );
}
