"use client";

import { Logout } from "@/lib";
import { FaPowerOff } from "react-icons/fa";

const LogoutButton = () => {
  async function onClick() {
    await Logout();
  }

  return (
    <button
      className="text-blue-600 shadow-lg hover:bg-blue-200 border border-blue-600 rounded-md  px-2 p-1 flex justify-center items-center gap-2"
      onClick={() => onClick()}
    >
      <FaPowerOff className="text-lg" /> Logout
    </button>
  );
};

export default LogoutButton;
