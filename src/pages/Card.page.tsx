import { ReactNode, lazy } from 'react';
import { useParams } from 'react-router-dom';

import useGetElement from '../hooks/useGetElement';
import getUrl from '../utils/getUrl';

import { Center, Loader } from '@mantine/core';
import { ElementCard } from '../components';

const ErrorBoundary = lazy(() => import('../components').then((module) => ({
  default: module.ErrorBoundary,
})));

type Props = {
  type: string;
};

export default function Card({ type }: Props): ReactNode {
  const { id } = useParams();
  const url = `${getUrl(type)}/${id}`;

  const { loading, error, element } = useGetElement(url);

  return (
    <ErrorBoundary>
      {!loading && <ElementCard element={element}/>}
      <Center>
        {loading && <Loader size={50} />}
        {error && <div>Ошибка</div>}
      </Center>
    </ErrorBoundary>
  );
}
