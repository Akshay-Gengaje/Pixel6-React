import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch users based on limit, page, state, and gender filters
const useFetchUsers = (limit = 0, page, state, gender) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Function to fetch users from the API
    const fetchUsers = async () => {
      try {
        // API call to fetch users, filtered by state if specified
        const response = await axios.get(
          `https://dummyjson.com/users/${
            state !== "all" ? "filter?key=address.state&value=" + state : ""
          }`,
          {
            params: {
              limit: limit,
              skip: (page - 1) * 10,
            },
          }
        );
        // Update total number of users for pagination
        setTotal(response.data.total);

        // Filter users by gender if specified, otherwise use all users
        if (gender !== "all") {
          if (gender === "male") {
            setUsers(
              response.data.users.filter((user) => user.gender === "male")
            );
          } else if (gender === "female") {
            setUsers(
              response.data.users.filter((user) => user.gender === "female")
            );
          }
        } else {
          setUsers(response.data.users);
        }
      } catch (err) {
        // Handle error and update error state
        setError(err);
        console.error(err.message);
      } finally {
        // Set loading to false once fetching is complete
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, gender, state]);

  return { users, loading, error, total, setUsers };
};

export default useFetchUsers;
