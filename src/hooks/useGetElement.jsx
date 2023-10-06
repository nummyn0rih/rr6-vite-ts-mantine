import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useGetElement(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [element, setElement] = useState({});

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios({
      method: 'GET',
      url,
    })
      .then((res) => {
        setElement({ ...res.data });
        setLoading(false);
      })
      .catch((e) => {
        setError(false);
        console.error(e);
      });
  }, [url]);

  return {
    loading,
    error,
    element,
  };
}
