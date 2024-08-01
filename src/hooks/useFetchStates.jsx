import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch unique states from users' addresses
const useFetchState = () => {
  const stateArray = [];
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch users and extract unique states
    const fetchUsers = async () => {
      try {
        // Fetch user data with only address information
        const response = await axios.get("https://dummyjson.com/users", {
          params: {
            select: "address",
            limit: 0,
          },
        });
        // Extract states from user addresses
        response.data.users.map((user) => stateArray.push(user.address.state));
        // Remove duplicate states
        const setOfState = [...new Set(stateArray)];
        setStates(setOfState);
      } catch (err) {
        // Handle error and update error state
        setError(err);
        console.error(err.message);
      } finally {
        // Set loading to false once fetching is done
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { states, loading, error };
};

export default useFetchState;
