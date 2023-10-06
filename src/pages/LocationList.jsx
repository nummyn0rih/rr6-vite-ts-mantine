import { lazy } from 'react';

const ComponentList = lazy(() => import('../components/ComponentList').then((module) => ({
  default: module.ComponentList,
})));
const ErrorBoundary = lazy(() => import('../components/ErrorBoundary').then((module) => ({
  default: module.ErrorBoundary,
})));

export default function Episodes() {
  return (
    <ErrorBoundary>
      <ComponentList name='locations' />
    </ErrorBoundary>
  );
}
