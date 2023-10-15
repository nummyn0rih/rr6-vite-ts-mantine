import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Paper } from '@mantine/core';
import { FormSignup } from '../components';
import { useAuth, AuthContextType } from '../context/AuthProvider';
import { Inputs } from '../types';

export default function Registration(): ReactNode {
  const { signup } = useAuth() as AuthContextType;
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const onSubmit = (inputs: Inputs) => {
    const newUser = {
      username: inputs.username,
      password: inputs.password,
    };

    signup(newUser, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <FormSignup handler={onSubmit} />
      </Paper>
    </Container>
  );
}
