import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetData from '../../hooks/useGetData';
import getUrl from '../../utils/getUrl';
import { Button, Container, Group, Stack, List } from '@mantine/core';

export function ElementsList(params: Object) {
  const navigate = useNavigate();
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
  }, [hasMore, loading]);

  const handleClickSort = (order) => () => {
    sort(order);
  };

  const handleClick = (id) => () => {
    navigate(`/${component}/${id}`);
  };

  return (
    <Container>
      <Group>
        <span>Упорядочить по дате: </span>
        <Button size="xs" onClick={handleClickSort('ASC')}>По возрастанию</Button>
        <Button size="xs" onClick={handleClickSort('DESC')}>По убыванию</Button>
      </Group>
      <Stack>
        <List
          type="ordered"
          size="xl"
          spacing="xs"
        >
          {elements.map((elem, index) => {
            if (elements.length - 3 === index + 1) {
              return <List.Item key={elem.id} ref={lastNodeRef}>{elem.name}</List.Item>
            } else {
              return <List.Item key={elem.id} onClick={handleClick(elem.id)}>{elem.name}</List.Item>
            }
          })}
        </List>
        
        {loading && <div className='elem-loading'>Загрузка ...</div>}
        {error && <div className='elem-error'>Ошибка</div>}
      </Stack>
    </Container>
  );
}
