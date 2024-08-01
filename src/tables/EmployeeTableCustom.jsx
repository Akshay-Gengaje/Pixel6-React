import { useState } from "react";
import useFetchUsers from "../hooks/useFetchUsers";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import useSortUsers from "../hooks/useSortUser";

const EmployeeTableCustom = ({ state, gender }) => {
  const [page, setPage] = useState(1);
  const {
    users: fetchedUsers,
    total,
    loading,
    error,
  } = useFetchUsers(10, page, state, gender);
  const { users, handleSort, sortBy } = useSortUsers(fetchedUsers);

  return (
    <div className="overflow-scroll mt-5 border border-gray-200 rounded-lg">
      <table className="w-full">
        <thead className="border-b border-gray-200 shadow-md ">
          <tr className="*:p-3 *:font-semibold text-left">
            <th onClick={() => handleSort("id")}>
              <span className="flex items-center hover:cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800 w-fit rounded-md">
                ID
                <IoIosArrowRoundUp
                  className={`${
                    sortBy.sortWith === "id" && sortBy.sortOrder === "asc"
                      ? "text-red-500"
                      : ""
                  }`}
                />
                <IoIosArrowRoundDown
                  className={`${
                    sortBy.sortWith === "id" && sortBy.sortOrder === "desc"
                      ? "text-red-500"
                      : ""
                  } -ml-2`}
                />
              </span>
            </th>
            <th>Image</th>
            <th onClick={() => handleSort("name")}>
              <span className="flex items-center hover:cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800  w-fit rounded-md   ">
                Full Name
                <IoIosArrowRoundUp
                  className={`${
                    sortBy.sortWith === "name" && sortBy.sortOrder === "asc"
                      ? "text-red-500"
                      : ""
                  }`}
                />
                <IoIosArrowRoundDown
                  className={`${
                    sortBy.sortWith === "name" && sortBy.sortOrder === "desc"
                      ? "text-red-500"
                      : ""
                  } -ml-2`}
                />
              </span>
            </th>
            <th onClick={() => handleSort("demography")}>
              <span className="flex items-center hover:cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800  w-fit rounded-md   ">
                Demography
                <IoIosArrowRoundUp
                  className={`${
                    sortBy.sortWith === "demography" &&
                    sortBy.sortOrder === "asc"
                      ? "text-red-500"
                      : ""
                  }`}
                />
                <IoIosArrowRoundDown
                  className={`${
                    sortBy.sortWith === "demography" &&
                    sortBy.sortOrder === "desc"
                      ? "text-red-500"
                      : ""
                  } -ml-2`}
                />
              </span>
            </th>
            <th>Designation</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="text-center">
              <td colSpan={6} className="py-40">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr className="text-center">
              <td colSpan={6} className="py-40">
                {error.message}
              </td>
            </tr>
          ) : (
            users?.map((users) => {
              return (
                <tr
                  key={users.id}
                  className=" border-b border-gray-100 hover:bg-gray-100 hover:dark:bg-gray-900 py-2 *:px-2"
                >
                  <td>{users.id}</td>
                  <td>
                    <img src={users.image} alt="" className="w-10 h-10" />
                  </td>
                  <td>
                    {users?.firstName +
                      " " +
                      users?.maidenName +
                      " " +
                      users?.lastName}
                  </td>
                  <td className="uppercase">
                    {users.gender[0]}/{users.age}
                  </td>
                  <td>{users.company.title}</td>
                  <td>
                    {users.address.state + ", " + users.address.stateCode}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot>
          {!error && (
            <tr className="border-t border-gray-200 *:py-2 ">
              <td colSpan="5">Total Users: {total}</td>
              {/* Pagination */}
              <td className="flex items-center gap-4">
                <MdKeyboardArrowLeft
                  className={`text-2xl  rounded-full ${
                    page > 1
                      ? "hover:cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-900"
                      : "cursor-not-allowed"
                  }`}
                  onClick={() => {
                    setPage((prevPage) =>
                      prevPage > 1 ? prevPage - 1 : prevPage
                    );
                  }}
                />
                <span className="text-lg">
                  {page} of {Math.ceil(total / 10)}
                </span>
                <MdKeyboardArrowRight
                  className={`text-2xl  rounded-full ${
                    page < Math.ceil(total / 10)
                      ? "hover:cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-900"
                      : "cursor-not-allowed"
                  }`}
                  onClick={() => {
                    setPage((prevPage) =>
                      prevPage < Math.ceil(total / 10) ? prevPage + 1 : prevPage
                    );
                  }}
                />
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </div>
  );
};

export default EmployeeTableCustom;
