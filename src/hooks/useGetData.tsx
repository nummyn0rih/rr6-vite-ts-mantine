import { useEffect, useState } from 'react';
import axios from 'axios';
import { Element } from '../types';

type SortArg = number | string
type SortFunc = (a: SortArg, b: SortArg) => number

const asc: SortFunc = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }

  return 0;
};

const desc: SortFunc = (a, b) => {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }

  return 0;
};

export type Direction = 'ASC' | 'DESC'

interface SortDirection {
  ASC: SortFunc
  DESC: SortFunc
}

const sortFuncs: SortDirection = {
  ASC: asc,
  DESC: desc,
};

interface GetDataType {
  loading: boolean
  error: boolean
  elements: Element[]
  hasMore: boolean
  sort: (order: Direction) => void
}

export function useGetData(url: string, pageNumber?: number): GetDataType {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [elements, setElements] = useState([] as Element[]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    // eslint-disable-next-line @typescript-eslint/ban-types
    let cancel: Function;

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
        setError(true);
        console.error(e);
      });

    return () => cancel();
  }, [url, pageNumber]);

  const sort = (order: Direction): void => {
    const newList = elements.sort((a, b) => {
      const func = sortFuncs[order];
      return func(a.created, b.created)
    });

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
