import { lazy } from 'react';
import { useParams } from 'react-router-dom';
import useGetElement from '../hooks/useGetElement';
import getUrl from '../utils/getUrl';

const ErrorBoundary = lazy(() => import('../components/ErrorBoundary').then((module) => ({
  default: module.ErrorBoundary,
})));

export default function Character() {
  const { id } = useParams();
  const url = `${getUrl('episodes')}/${id}`;

  const { loading, error, element } = useGetElement(url);

  return (
    <ErrorBoundary>
      <div className='card'>
        <div className='card-content'>
          <h1>{element.name}</h1>
          <hr />
          <p>Дата выхода: {element.air_date}</p>
          <p>Номер: {element.episode}</p>
        </div>
      </div>

      {loading && <div className='elem-loading'>Загрузка ...</div>}
      {error && <div className='elem-error'>Ошибка</div>}
    </ErrorBoundary>
  );
}
