import { lazy } from 'react';
import { useParams } from 'react-router-dom';
import useGetElement from '../hooks/useGetElement';
import getUrl from '../utils/getUrl';

const ErrorBoundary = lazy(() => import('../components/ErrorBoundary').then((module) => ({
  default: module.ErrorBoundary,
})));

export default function Character() {
  const { id } = useParams();
  const url = `${getUrl('characters')}/${id}`;

  const { loading, error, element } = useGetElement(url);

  return (
    <ErrorBoundary>
      <div className='card'>
        <img src={element.image} alt={element.name} className='mr-15'></img>
        <div className='card-content'>
          <h1>{element.name}</h1>
          <hr />
          <p>Статус: {element.status}</p>
          <p>Вид: {element.species}</p>
          {element.type && <p>Тип: {element.type}</p>}
          <p>Пол: {element.gender}</p>
        </div>
      </div>

      {loading && <div className='elem-loading'>Загрузка ...</div>}
      {error && <div className='elem-error'>Ошибка</div>}
    </ErrorBoundary>
  );
}
