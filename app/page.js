import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  console.log("page", session);

  return (
    <div className="grid   p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>name: {session.user.name}</p>
      <p>email: {session.user.email}</p>
      <p>role: {session.user.role}</p>
      <p>code: {session.user.code}</p>
    </div>
  );
}
