import { AiFillDelete } from "react-icons/ai";
import React from "react";

export default function DayList() {
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

            <tbody className="">
              <tr className="">
                <td className="text-center">1</td>
                <td className="text-center">2024-09-04</td>
                <td className="">020 - Dhanmondi</td>
                <td className="text-right">0.00</td>
                <td className="text-right">0.00</td>
                <td className="text-center">04/09/2024 21:4:10</td>
                <td className="text-center">
                  <div className="btn-action d-flex justify-center btn_table_row">
                    <button
                      id="deletebtn"
                      title="Delete"
                      type="button"
                      className="p-1"
                    >
                      <AiFillDelete className={"text-red-700"} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
