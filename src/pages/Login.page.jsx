import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { Container, Paper } from '@mantine/core';
import { FormSignin } from '../components';

import { notifications } from '@mantine/notifications';
import classes from './Login.page.module.css';

export default function LoginPage() {
  const { isError, signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const showNotification = () => {
    notifications.show({
      color: 'red',
      title: 'Ошибка!',
      message: 'Неправильное имя пользователя или пароль',
      classNames: classes,
      autoClose: 3000,
    })
  };

  const onSubmit = (inputs) => {
    const user = {
      username: inputs.username,
      password: inputs.password,
    };
    
    signin(user, () => {
      navigate(from, { replace: true });
    }, showNotification);
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <FormSignin handler={onSubmit} />
      </Paper>
    </Container>
  );
}
