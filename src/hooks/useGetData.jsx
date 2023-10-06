import { useEffect, useState } from 'react';
import axios from 'axios';

const asc = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }

  return 0;
};

const desc = (a, b) => {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }

  return 0;
};

const sortFuncs = {
  ASC: asc,
  DESC: desc,
};

export default function useGetData(url, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [elements, setElements] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;

    axios({
      method: 'GET',
      url,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setElements((prevState) => [...prevState, ...res.data.results]);
        setHasMore(res.data.info.pages !== pageNumber);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        setError(false);
        console.error(e);
      });

    return () => cancel();
  }, [url, pageNumber]);

  const sort = (order) => {
    const newList = elements.sort((a, b) =>
      sortFuncs[order](a.created, b.created)
    );

    setElements([...newList]);
  };

  return {
    loading,
    error,
    elements,
    hasMore,
    sort,
  };
}
