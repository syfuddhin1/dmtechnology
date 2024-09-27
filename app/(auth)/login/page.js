import { loginUser } from "@/lib";
import Image from "next/image";

export default function SignIn({ searchParams }) {
  return (
    <form action={loginUser} className="flex flex-col gap-5 p-20">
      <h2 className="text-center text-md font-bold  py-2 font-mono border-b-2">Accounting System</h2>
      <div className="w-full items-center flex justify-center">
        <h1 className="text-center text-md font-bold  py-2 font-mono border-b-2">
          Login Form
        </h1>
      </div>
      <div className="flex flex-col text-xs gap-4 justify-center items-center">
        <label>
          Email
          <input name="email" type="email" defaultValue={searchParams?.email} />
        </label>
        <label>
          Password
          <input name="password" type="password" defaultValue={searchParams?.password

          } />
        </label>
        <button className="text-xs h-8 px-16 ">Sign In</button>
      </div>
    </form>
  );
}
