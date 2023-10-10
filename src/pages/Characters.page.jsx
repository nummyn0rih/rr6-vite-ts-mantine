import { lazy } from 'react';

const ElementsList = lazy(() => import('../components').then((module) => ({
  default: module.ElementsList,
})));
const ErrorBoundary = lazy(() => import('../components').then((module) => ({
  default: module.ErrorBoundary,
})));

export default function Characters() {
  return (
    <ErrorBoundary>
      <ElementsList name='characters' />
    </ErrorBoundary>
  );
}
