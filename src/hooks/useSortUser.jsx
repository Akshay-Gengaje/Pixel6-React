import { useState, useEffect } from "react";

// Custom hook to handle sorting of users
const useSortUsers = (initialUsers) => {
  const [users, setUsers] = useState(initialUsers);
  const [sortBy, setSortBy] = useState({
    sortWith: "id", // Column to sort by
    clickCount: 0, // Click count to cycle through sort orders
    sortOrder: "none", // Current sort order
  });

  // Array to cycle through sort orders: none -> asc -> desc
  const sortOrder = ["none", "asc", "desc"];

  // Function to handle sorting based on the clicked column header
  const handleSort = (column) => {
    setSortBy((prev) => {
      // If the same column is clicked, cycle through sort orders
      if (prev.sortWith === column) {
        const newClickCount = (prev.clickCount + 1) % 3;
        return {
          sortWith: column,
          clickCount: newClickCount,
          sortOrder: sortOrder[newClickCount],
        };
      } else {
        // If a new column is clicked, start with ascending order
        return {
          sortWith: column,
          clickCount: 1,
          sortOrder: sortOrder[1],
        };
      }
    });
  };

  useEffect(() => {
    // If sort order is "none", reset to initial users
    if (sortBy.sortOrder === "none") {
      setUsers(initialUsers);
      return;
    }
    // Create a copy of the initial users to sort
    const sortedUsers = [...initialUsers];
    // Sort users based on the selected column and order
    if (sortBy.sortWith === "id") {
      sortedUsers.sort((a, b) =>
        sortBy.sortOrder === "asc" ? a.id - b.id : b.id - a.id
      );
    } else if (sortBy.sortWith === "name") {
      sortedUsers.sort((a, b) =>
        sortBy.sortOrder === "asc"
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName)
      );
    } else if (sortBy.sortWith === "demography") {
      sortedUsers.sort((a, b) =>
        sortBy.sortOrder === "asc" ? a.age - b.age : b.age - a.age
      );
    }
    // Update the users state with the sorted users
    setUsers([...sortedUsers]);
  }, [sortBy.sortWith, sortBy.sortOrder, initialUsers]);

  return { users, handleSort, sortBy };
};

export default useSortUsers;
