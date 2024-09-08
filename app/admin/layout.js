import NavBar from "../_component/nav/NavBar";
import "../globals.css";
import NavBarLeft from "./_component/NavBarLeft";
export const metadata = {
  title: "DM | Admin",
  description: "DM Technology Limited",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="flex flex-col xl:flex-row text-xs">
          <div>
            <NavBarLeft />
          </div>
          <div className="p-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
