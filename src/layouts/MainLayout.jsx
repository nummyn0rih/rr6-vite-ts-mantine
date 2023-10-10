import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import { Header } from '../components';

const ErrorBoundary = lazy(() => import('../components').then((module) => ({
  default: module.ErrorBoundary,
})));

export function MainLayout() {
  return (
    <Container>
      <Header/>
      <ErrorBoundary>
        <Suspense>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
}
