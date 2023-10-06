import { lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { Container, Paper } from '@mantine/core';
import { FormSignin } from '../components';

const ErrorBoundary = lazy(() => import('../components/ErrorBoundary').then((module) => ({
  default: module.ErrorBoundary,
})));

export default function LoginPage() {
  const { isError, signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const onSubmit = (inputs) => {
    const user = {
      username: inputs.username,
      password: inputs.password,
    };

    signin(user, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <FormSignin handler={onSubmit} />
      </Paper>
    </Container>
  );
}
