import { createContext, useContext, useEffect, useState } from "react";
import http from "../http";

import data from "../data/medias.json";

const MediaContext = createContext();

export const useMediaContext = () => {
  return useContext(MediaContext);
};

const MediaContextProvider = ({ children }) => {
  const [medias, setMedias] = useState([]);
  const [mediaId, setMediaId] = useState("");

  const createMedia = async (data) => {
    return await http.post("/api/medias", data);
  };

  const uploadFile = async (data) => {
    await http.post("/api/upload", data);
  };

  const updateMedia = async (data, mediaId) => {
    await http.put(`/api/medias/${mediaId}`, data);
  };

  const deleteMedia = async (data, mediaId) => {
    await http.delete(`/api/medias/${mediaId}`, data);
  };

  const getMediId = (id) => {
    setMediaId(id);
  };

  useEffect(() => {
    const readAllMedias = async () => {
      // const response = await http.get(
      //   "/api/medias?populate=*&pagination[limit]=100"
      // );
      // const responseArr = Object.values(response.data.data);

      setMedias(data);
    };

    readAllMedias();
  }, []);

  const value = {
    createMedia,
    uploadFile,
    updateMedia,
    deleteMedia,
    getMediId,
    medias,
    setMedias,
    mediaId,
  };

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

export default MediaContextProvider;
