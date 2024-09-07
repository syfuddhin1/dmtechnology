import { AiFillDelete } from "react-icons/ai";
import React from "react";
import { getBranchData } from "@/lib/crud";
import { formatDate } from "@/utils/formatDate";
import DayDeleteButton from "./DayDeleteButton";

export default async function DayList() {
  const data = (await getBranchData()).data;

  return (
    <div className="card-body">
      <div>
        <div className="table-responsive">
          <table className={"w-full mt-2 text-center"}>
            <thead className="">
              <tr>
                <th className="">#</th>
                <th className="sorting">Date</th>
                <th className="sorting">Branch</th>

                <th className="sorting">Total Recipt</th>
                <th className="sorting">Total Payment</th>
                <th>Time</th>
                <th className="">Action</th>
              </tr>
            </thead>

            <tbody className="capitalize">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="">{index + 1}</td>
                  <td className="">{formatDate(item.date)}</td>
                  <td className="">
                    {item.code}-{item.name}
                  </td>
                  <td className="text-right">{item.totalReceipt}</td>
                  <td className="text-right">{item.totalPayment}</td>
                  <td className="">{item.updatedAt.toLocaleString()}</td>
                  <td className="text-center">
                    <div className="btn-action d-flex justify-center btn_table_row">
                      {index === 0 && <DayDeleteButton id={item.id} />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
