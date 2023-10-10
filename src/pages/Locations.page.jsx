import { lazy } from 'react';

const ElementsList = lazy(() => import('../components').then((module) => ({
  default: module.ElementsList,
})));
const ErrorBoundary = lazy(() => import('../components').then((module) => ({
  default: module.ErrorBoundary,
})));

export default function Locations() {
  return (
    <ErrorBoundary>
      <ElementsList name='locations' />
    </ErrorBoundary>
  );
}
