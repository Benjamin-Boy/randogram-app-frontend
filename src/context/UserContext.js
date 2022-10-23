import { createContext, useContext, useState, useEffect } from "react";
import http from "../http";

import data from "../data/users.json";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const createUser = async (data) => {
    await http.post("/api/auth/local/register", data);
  };

  const updateUser = async (userId, data) => {
    await http.put(`/api/users/${userId}`, data);
  };

  const deleteUser = async (userId) => {
    await http.delete(`/api/users/${userId}`);
  };

  // const resetPassword = async (data) => {
  //   await http.put(`/api/auth/reset-password`, data);
  // };

  const getUserId = (id) => {
    setUserId(id);
  };

  useEffect(() => {
    const readAllUsers = async () => {
      // const response = await http.get(
      //   "/api/users?populate=bookmarks, treksDone, avatar, avatar.url"
      // );

      setUsers(data);
    };

    readAllUsers();
  }, []);

  const value = {
    createUser,
    updateUser,
    deleteUser,
    getUserId,
    userId,
    users,
    setUsers,
    currentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
