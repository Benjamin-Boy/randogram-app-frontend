import { createContext, useContext, useEffect, useState } from "react";
import http from "../http";

import data from "../data/treks.json";

const TrekContext = createContext();

export const useTrekContext = () => {
  return useContext(TrekContext);
};

const TrekContextProvider = ({ children }) => {
  const [treks, setTreks] = useState([]);
  const [trekId, setTrekId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const createTrek = async (data) => {
    await http.post("/api/treks", data);
  };

  const updateTrek = async (trekId, data) => {
    await http.put(`/api/treks/${trekId}`, data);
  };

  const deleteTrek = async (trekId, data) => {
    await http.delete(`/api/treks/${trekId}`, data);
  };

  const getTrekId = (id) => {
    setTrekId(id);
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      const readAllTreks = async () => {
        // const response = await http.get(
        //   "/api/treks?pagination[pageSize]=100&populate=creator, medias, medias.url&sort[0]=name:asc"
        // );
        // const responseArr = Object.values(response.data.data);
        setTreks(data);
      };

      readAllTreks();
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching treks");
      setIsLoading(false);
    }
  }, [isLoading, setTreks]);

  const value = {
    createTrek,
    updateTrek,
    deleteTrek,
    getTrekId,
    trekId,
    treks,
    setTreks,
    isLoading,
  };

  return <TrekContext.Provider value={value}>{children}</TrekContext.Provider>;
};

export default TrekContextProvider;
