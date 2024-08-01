import { FaFilter } from "react-icons/fa6";
import EmployeeTableCustom from "../tables/EmployeeTableCustom";
import useFetchState from "../hooks/useFetchStates";
import { useState } from "react";

const Employees = () => {
  const { states } = useFetchState();
  const [selectedState, setSelectedState] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  return (
    <div>
      {/* Header section with title and filter options */}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees</h1>
        <div className="flex items-center gap-5">
          <FaFilter className="text-red-700" />
          {/* Dropdown to filter by state */}
          <div>
            <select
              className="p-1 border border-black rounded-sm dark:bg-gray-900"
              name="state"
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="all">State</option>
              {states?.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          {/* Dropdown to filter by gender */}
          <div>
            <select
              className="p-1 border border-black rounded-sm dark:bg-gray-900 "
              name="gender"
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="all">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>
      {/* Employee table with applied filters */}
      <EmployeeTableCustom state={selectedState} gender={selectedGender} />
    </div>
  );
};

export default Employees;
