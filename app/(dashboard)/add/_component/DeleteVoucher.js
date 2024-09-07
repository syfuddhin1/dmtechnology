"use client";

import { deleteVoucher } from "@/lib/crud";
import { AiFillDelete } from "react-icons/ai";

export default function DeleteVoucher({ voucher }) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this voucher?");
    if (confirmed) {
      try {
        await deleteVoucher(voucher?.id);
        // Add any additional logic here, like updating state or showing a success message
      } catch (error) {
        console.error("Failed to delete voucher:", error);
        // Optionally, handle the error by showing a message to the user
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-xl p-1 text-red-700 hover:text-red-900"
    >
      <AiFillDelete />
    </button>
  );
}
