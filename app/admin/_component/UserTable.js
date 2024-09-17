import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import React from "react";
import FilterAndSearchForm from "./FilterForm";
import UserDeleteButton from "./UserDeleteButton";


const UserTable = ({ users, zoneUsers }) => {
  return (
    <div className="h-[85vh] overflow-x-scroll">
      <div className="flex gap-3 p-2 w-full justify-center items-center  font-semibold text-left text-gray-900 bg-blue-100 flex justify-between items-center">
        Users List 
        <Link
          href={"/admin/add"}
          className="text-xs font-thin h-8 bg-cyan-600 flex justify-center items-center p-2 rounded-md text-cyan-50"
        >
          Create New User
        </Link>
      </div>
      <FilterAndSearchForm  zoneUsers={zoneUsers}/>
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
            <th scope="col" className="px-2 py-1">
             Action
            </th>
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
              <td className="whitespace-nowrap px-2 py-1">
                <UserDeleteButton user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
