import localFont from "next/font/local";
import NavBar from "../_component/nav/NavBar";
import "../globals.css";
import NavBarLeft from "./_component/NavBarLeft";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "DM Tech.",
  description: "DM Technology Limited",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  if (session.user.role == "admin") {
    redirect("/admin");
  } else if (session.user.role == "super") {
    redirect("/zone");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-2  p-2">
            <NavBarLeft />
          </div>
          <div className="col-span-12 xl:col-span-10 p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
