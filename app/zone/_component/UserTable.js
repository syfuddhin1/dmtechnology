import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import React from "react";

const UserTable = ({ users }) => {
  return (
    <div className="h-[75vh] overflow-x-hidden">
      <div className="p-2  font-semibold text-left text-gray-900 bg-blue-100 flex justify-between">
        Users List{" "}
        <Link href={"/admin/add"} className="btn text-xs font-thin">
          Create New User
        </Link>
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
              Email
            </th>

            <th scope="col" className="px-2 py-1">
              Role
            </th>
            <th scope="col" className="px-2 py-1">
              Code
            </th>
            <th scope="col" className="px-2 py-1">
              Created At
            </th>
            {/* <th scope="col" className="px-2 py-1">
              Updated At
            </th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-b even:bg-gray-200">
              <td className="whitespace-nowrap px-2 py-1">{index + 1}</td>
              <td className="whitespace-nowrap px-2 py-1">{user.name}</td>
              <td className="whitespace-nowrap px-2 py-1">{user.email}</td>
              <td className="whitespace-nowrap px-2 py-1">{user.role}</td>
              <td className="whitespace-nowrap px-2 py-1">{user.code}</td>
              <td className="whitespace-nowrap px-2 py-1">
                {formatDate(user.createdAt)}
              </td>
              {/* <td className="whitespace-nowrap px-2 py-1">
                {new Date(user.updatedAt).toLocaleString()}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
