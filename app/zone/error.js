"use client";
import Link from "next/link";
import React from "react";

export default function error(error) {
  return (
    <div>
      Sorry! Something Went wrong! please try again.
      <br />
      <button onClick={() => window.location.reload()} className="btn">
        Try Again
      </button>
    </div>
  );
}
