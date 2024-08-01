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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees</h1>
        <div className="flex items-center gap-5">
          <FaFilter className="text-red-700" />
          {/* <CountryOptions /> */}
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
          {/* Gender Options  */}
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
      <EmployeeTableCustom state={selectedState} gender={selectedGender} />
    </div>
  );
};

export default Employees;
