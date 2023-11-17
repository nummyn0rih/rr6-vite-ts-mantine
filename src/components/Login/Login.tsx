import { useNavigate } from 'react-router-dom';
import { useAuth, AuthContextType } from '../../context/AuthProvider';
import { Group, Button } from '@mantine/core';
import classes from './Login.module.css';

export function Login() {
  const { currentUser, signout } = useAuth() as AuthContextType;
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout(() => {
      navigate('/');
    });
  };

  return (
    <>
      {currentUser === null ? (
        <Group gap={5}>
          <Button
            className={classes.button}
            size="xs"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
          <Button
            className={classes.button}
            size="xs"
            onClick={() => navigate('/registration')}
          >
            Sign Up
          </Button>
        </Group>
      ) : (
        <Button
          size="xs"
          variant="outline"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      )}
    </>
  );
}
