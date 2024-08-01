import { useState } from "react";

import useFetchUsers from "../hooks/useFetchUsers";
import useSortUsers from "../hooks/useSortUser";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";

const SortableHeader = ({ label, sortBy, handleSort, field }) => (
  <th onClick={() => handleSort(field)} className="cursor-pointer">
    <span className="flex items-center w-fit rounded-md hover:bg-gray-100 hover:dark:bg-gray-800">
      {label}
      <IoIosArrowRoundUp
        className={`${
          sortBy.sortWith === field && sortBy.sortOrder === "asc"
            ? "text-red-500"
            : ""
        }`}
      />
      <IoIosArrowRoundDown
        className={`${
          sortBy.sortWith === field && sortBy.sortOrder === "desc"
            ? "text-red-500"
            : ""
        } -ml-2`}
      />
    </span>
  </th>
);

const UserRow = ({ user }) => (
  <tr className="border-b border-gray-100 hover:bg-gray-100 hover:dark:bg-gray-900 py-2 *:px-2">
    <td>{user.id}</td>
    <td>
      <img src={user.image} alt="User" className="w-10 h-10" />
    </td>
    <td>{`${user.firstName} ${user.maidenName} ${user.lastName}`}</td>
    <td className="uppercase">{`${user.gender[0]}/${user.age}`}</td>
    <td>{user.company.title}</td>
    <td>{`${user.address.state}, ${user.address.stateCode}`}</td>
  </tr>
);

const EmployeeTableCustom = ({ state, gender }) => {
  const [page, setPage] = useState(1);
  const {
    users: fetchedUsers,
    total,
    loading,
    error,
  } = useFetchUsers(10, page, state, gender);
  const { users, handleSort, sortBy } = useSortUsers(fetchedUsers);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < Math.ceil(total / 10)) setPage(page + 1);
  };

  return (
    <div className="overflow-scroll mt-5 border border-gray-200 rounded-lg">
      <table className="w-full">
        <thead className="border-b border-gray-200 shadow-md">
          <tr className="*:p-3 *:font-semibold  text-left ">
            <SortableHeader
              label="ID"
              sortBy={sortBy}
              handleSort={handleSort}
              field="id"
            />
            <th>Image</th>
            <SortableHeader
              label="Full Name"
              sortBy={sortBy}
              handleSort={handleSort}
              field="name"
            />
            <SortableHeader
              label="Demography"
              sortBy={sortBy}
              handleSort={handleSort}
              field="demography"
            />
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
            users.map((user) => <UserRow key={user.id} user={user} />)
          )}
        </tbody>
        <tfoot>
          {!error && (
            <tr className="border-t border-gray-200 *:py-2 *:px-2">
              <td colSpan="5">Total Users: {total}</td>
              <td className="flex items-center gap-4">
                <MdKeyboardArrowLeft
                  className={`text-2xl rounded-full ${
                    page > 1
                      ? "hover:cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-900"
                      : "cursor-not-allowed"
                  }`}
                  onClick={handlePreviousPage}
                />
                <span className="text-lg">{`${page} of ${Math.ceil(
                  total / 10
                )}`}</span>
                <MdKeyboardArrowRight
                  className={`text-2xl rounded-full ${
                    page < Math.ceil(total / 10)
                      ? "hover:cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-900"
                      : "cursor-not-allowed"
                  }`}
                  onClick={handleNextPage}
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
