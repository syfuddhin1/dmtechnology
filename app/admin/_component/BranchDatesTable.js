import { formatDate } from "@/utils/formatDate";
import React from "react";

const BranchDatesTable = ({ branches }) => {
  return (
    <div className="h-[75vh] overflow-x-hidden">
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
              Date
            </th>
            <th scope="col" className="px-2 py-1">
              Created At
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
              <td className="whitespace-nowrap px-2 py-1">
                {formatDate(branch.createdAt)}
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
