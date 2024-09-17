import { redirect } from "next/navigation";
import "../globals.css";
import { auth } from "@/auth";

export const metadata = {
  title: "DM | Login.",
  description: "DM Technology Limited",
};

export default async function RootLayout({ children }) {
  
  try {
    const session = await auth();
    if (session) {
      redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
 
  return (
    <html lang="en">
      <body className="flex flex-col h-screen justify-center items-center">
        {children}
      </body>
    </html>
  );
}
