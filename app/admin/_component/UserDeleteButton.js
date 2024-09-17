"use client";

import { deleteUser } from "@/lib/admin";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

export default function UserDeleteButton({ user }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return; // Only proceed if the user confirms

    setIsDeleting(true); // Indicate that the deletion is in progress

    try {
      await deleteUser(user.email,user.name); // Attempt to delete the data
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Error deleting data. Please try again.");
    } finally {
      setIsDeleting(false); // Reset the loading state
    }
  };

  return (
    <button
      id="btn"
      title="Delete"
      type="button"
      className="p-1"
      onClick={handleDelete}
      disabled={isDeleting} // Disable the button while deleting
    >
      {isDeleting ? (
        <span className="text-gray-500">...</span>
      ) : (
        <AiFillDelete className="text-red-700" />
      )}
    </button>
  );
}
