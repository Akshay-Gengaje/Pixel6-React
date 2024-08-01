import { useState, useEffect } from "react";

const useSortUsers = (initialUsers) => {
  const [users, setUsers] = useState(initialUsers);
  const [sortBy, setSortBy] = useState({
    sortWith: "id",
    clickCount: 0,
    sortOrder: "none",
  });

  const sortOrder = ["none", "asc", "desc"];

  const handleSort = (column) => {
    setSortBy((prev) => {
      if (prev.sortWith === column) {
        const newClickCount = (prev.clickCount + 1) % 3;
        return {
          sortWith: column,
          clickCount: newClickCount,
          sortOrder: sortOrder[newClickCount],
        };
      } else {
        return {
          sortWith: column,
          clickCount: 1,
          sortOrder: sortOrder[1],
        };
      }
    });
  };

  useEffect(() => {
    if (sortBy.sortOrder === "none") {
      setUsers(initialUsers);
      return;
    }
    const sortedUsers = [...initialUsers];
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
    setUsers([...sortedUsers]);
  }, [sortBy.sortWith, sortBy.sortOrder, initialUsers]);

  return { users, handleSort, sortBy };
};

export default useSortUsers;
