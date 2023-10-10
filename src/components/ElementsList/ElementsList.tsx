import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGetData from '../../hooks/useGetData';
import getUrl from '../../utils/getUrl';

import { Button, Container, Center, Group, Stack, List, Paper, Loader } from '@mantine/core';
import classes from './ElementsList.module.css';

export function ElementsList(params) {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);

  const component = params.name;
  const url = getUrl(component);

  const { loading, error, elements, hasMore, sort } = useGetData(
    url,
    pageNumber
  );

  const observer = useRef();
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
      <Center>
        <Group>
          <span>Упорядочить по дате: </span>
          <Button size="xs" variant="outline" onClick={handleClickSort('ASC')}>По возрастанию</Button>
          <Button size="xs" variant="outline" onClick={handleClickSort('DESC')}>По убыванию</Button>
        </Group>
      </Center>
      <Center mt={10}>
        <Stack maw={600}>
          <List
            className={classes.list}
            type="ordered"
            size="xl"
            spacing="xs"
          >
            {elements.map((elem, index) => {
              if (elements.length - 3 === index + 1) {
                return (
                  <Paper key={elem.id} className={classes.item} shadow="sm" withBorder p="sm" mt={8}>
                    <List.Item ref={lastNodeRef}>{elem.name}</List.Item>
                  </Paper>
                );
              } else {
                return (
                  <Paper key={elem.id} className={classes.item} shadow="sm" withBorder p="sm" mt={8}>
                    <List.Item onClick={handleClick(elem.id)}>{elem.name}</List.Item>
                  </Paper>
                );
              }
            })}
          </List>
          
          {loading && <Loader size={50} />}
          {error && <div>Ошибка</div>}
        </Stack>
      </Center>
    </Container>
  );
}
