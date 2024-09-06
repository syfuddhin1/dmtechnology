import { loginUser } from "@/lib";

export default function SignIn() {
  return (
    <form action={loginUser} className="flex flex-col gap-4">
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
