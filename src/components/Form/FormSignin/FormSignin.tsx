import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { Link } from 'react-router-dom';

export function FormSignin({ handler }) {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      password: (value) => (value.length < 6 ? 'Pass must have at least 6 symbols' : null),
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handler(values))}>
        <TextInput mt="md" label="Имя" placeholder="username" {...form.getInputProps('username')} />
        <PasswordInput
          mt="md"
          label="Пароль"
          placeholder="password"
          {...form.getInputProps('password')}
        />

        <Group justify="center" mt="xl">
          <Button type="submit">Войти</Button>
          <Button variant="subtle" component={Link} to="/registration">
            Регистрация
          </Button>
        </Group>
      </form>
    </Box>
  );
}