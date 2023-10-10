import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import AuthProvider from './context/AuthProvider';

import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import { theme } from "./theme";

import { Router } from './Router';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </MantineProvider>
  );
}
