import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);

      try {
        const { data } = await axios.get(url);

        // console.log(data);

        // , {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        //   },
        // }

        setData(data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
