import { lazy } from 'react';
import { useRouteError } from 'react-router-dom';

const NotFoundTitle = lazy(() => import('../components/NotFoundTitle').then((module) => ({
  default: module.NotFoundTitle,
})));

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <NotFoundTitle/>
  );
}

    // <div className='error-page'>
    //   <h1>Ой!</h1>
    //   <p>Произошла непредвиденная ошибка.</p>
    //   <p><i className='error'>{error.statusText || error.message}</i></p>
    // </div>