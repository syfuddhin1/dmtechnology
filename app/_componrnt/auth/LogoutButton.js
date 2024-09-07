"use client";

import { Logout } from "@/lib";

const LogoutButton = () => {
  async function onClick() {
    await Logout();
  }

  return (
    <button className="btn" onClick={() => onClick()}>
      Logout
    </button>
  );
};

export default LogoutButton;
