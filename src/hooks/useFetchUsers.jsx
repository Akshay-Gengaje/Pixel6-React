import { useState, useEffect } from "react";
import axios from "axios";

const useFetchUsers = (limit = 0, page, state, gender) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
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
        setTotal(response.data.total);
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
        setError(err);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, gender, state]);

  return { users, loading, error, total, setUsers };
};

export default useFetchUsers;
