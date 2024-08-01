import { useState, useEffect } from "react";
import axios from "axios";

const useFetchState = () => {
  const stateArray = [];
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users", {
          params: {
            select: "address",
            limit: 0,
          },
        });
        response.data.users.map((user) => stateArray.push(user.address.state));
        const setOfState = [...new Set(stateArray)];
        setStates(setOfState);
      } catch (err) {
        setError(err);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { states, loading, error };
};

export default useFetchState;
