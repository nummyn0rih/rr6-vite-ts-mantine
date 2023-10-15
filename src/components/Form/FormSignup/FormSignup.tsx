import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { Inputs } from '../../../types';

type Props = {
  handler: (inputs: Inputs) => void
};

export function FormSignup({ handler }: Props) {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      password: (value) => (value.length < 6 ? 'Pass must have at least 6 symbols' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => {
        console.log(values);
        handler(values)})}>
        <TextInput mt="md" label="Имя" placeholder="username" {...form.getInputProps('username')} />
        <PasswordInput
          mt="md"
          label="Пароль"
          placeholder="password"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          mt="sm"
          label="Подтвердите пароль"
          placeholder="confirm password"
          {...form.getInputProps('confirmPassword')}
        />

        <Group justify="center" mt="xl">
          <Button type="submit">Отправить</Button>
        </Group>
      </form>
    </Box>
  );
}