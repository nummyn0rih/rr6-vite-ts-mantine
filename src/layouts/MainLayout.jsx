import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';

const ErrorBoundary = lazy(() => import('../components').then((module) => ({
  default: module.ErrorBoundary,
})));

export function MainLayout() {
  return (
    <>
      <Header/>
      <ErrorBoundary>
        <Suspense fallback={<div>Загрузка ...</div>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
