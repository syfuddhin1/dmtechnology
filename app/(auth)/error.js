"use client";
import Link from "next/link";
import React from "react";

export default function error(error) {
  return (
    <div>
      Sorry Your credentials are wrong! please try again.
      <br />
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
}