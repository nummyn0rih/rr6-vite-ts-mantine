import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useGetData from '../../hooks/useGetData';
import getUrl from '../../utils/getUrl';
import { Button } from '../Button';
import './ComponentList.css';

export function ComponentList(params) {
  const [pageNumber, setPageNumber] = useState(1);

  const component = params.name;
  const url = getUrl(component);

  const { loading, error, elements, hasMore, sort } = useGetData(
    url,
    pageNumber
  );

  const observer = useRef();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lastNodeRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevState) => prevState + 1);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  });

  const handleClick = (order) => () => {
    sort(order);
  };

  return (
    <div>
      <div className='sort'>
        <span>Упорядочить по дате: </span>
        <Button handler={handleClick('ASC')}>По возрастанию</Button>
        <Button handler={handleClick('DESC')}>По убыванию</Button>
      </div>
      <ul className='older'>
        {elements.map((elem, index) => {
          if (elements.length - 3 === index + 1) {
            return (
              <li key={elem.id} ref={lastNodeRef}>
                <Link to={`/${component}/${elem.id}`}>{elem.name}</Link>
              </li>
            );
          } else {
            return (
              <li key={elem.id}>
                <Link to={`/${component}/${elem.id}`}>{elem.name}</Link>
              </li>
            );
          }
        })}
        {loading && <div className='elem-loading'>Загрузка ...</div>}
        {error && <div className='elem-error'>Ошибка</div>}
      </ul>
    </div>
  );
}
