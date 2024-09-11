import { calculateDateDifference } from "@/utils/calculatedDays";
import { formatDate } from "@/utils/formatDate";
import React from "react";

const BranchDatesTable = ({ branches }) => {
  return (
    <div className="h-[85vh] overflow-y-scroll capitalize">
      <div className="p-2  font-semibold text-left text-gray-900 bg-blue-100 flex justify-between items-center">
        Branch Progress
      </div>
      <table className="min-w-full text-left text-sm font-light border border-gray-200 shadow-lg relative">
        <thead className="border-b bg-blue-100 sticky top-0">
          <tr>
            <th scope="col" className="px-2 py-1">
              sl
            </th>
            <th scope="col" className="px-2 py-1">
              Name
            </th>
            <th scope="col" className="px-2 py-1">
              Code
            </th>
            <th scope="col" className="px-2 py-1">
              Current Working Date
            </th>
            <th scope="col" className="px-2 py-1">
              Lag Day
            </th>
            <th scope="col" className="px-2 py-1">
              Updated At
            </th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch, index) => (
            <tr key={branch.id} className="border-b even:bg-gray-200">
              <td className="whitespace-nowrap px-2 py-1">{index + 1}</td>
              <td className="whitespace-nowrap px-2 py-1">{branch.name}</td>
              <td className="whitespace-nowrap px-2 py-1">{branch.code}</td>
              <td className="whitespace-nowrap px-2 py-1">
                {formatDate(branch.date)}
              </td>
              <td
                className={`whitespace-nowrap px-2 py-1 ${
                  calculateDateDifference(branch.date) > 5 && "bg-red-300"
                }`}
              >
                {calculateDateDifference(branch.date)} Days
              </td>
              <td className="whitespace-nowrap px-2 py-1">
                {formatDate(branch.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchDatesTable;
