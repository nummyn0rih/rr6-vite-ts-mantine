import "@mantine/core/styles.css";
import AuthProvider from './context/AuthProvider';
import { MantineProvider } from "@mantine/core";
import { Router } from './Router';
import { theme } from "./theme";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </MantineProvider>
  );
}
