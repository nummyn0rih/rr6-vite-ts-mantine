import { lazy } from 'react';
import { useRouteError } from 'react-router-dom';

const NotFoundTitle = lazy(() => import('../components').then((module) => ({
  default: module.NotFoundTitle,
})));

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return <NotFoundTitle/>;
}
