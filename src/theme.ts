import { createTheme, MantineColorsTuple } from "@mantine/core";

const green: MantineColorsTuple = [
  '#f3f9f0',
  '#e6f1e1',
  '#c8e2bd',
  '#a8d297',
  '#8dc576',
  '#7dbe61',
  '#73ba56',
  '#61a346',
  '#55903c',
  '#467d30'
];

const blue: MantineColorsTuple = [
  '#e4feff',
  '#d0f9ff',
  '#a1f2fe',
  '#6febfd',
  '#4fe5fc',
  '#3fe2fc',
  '#32e0fd',
  '#23c6e1',
  '#00b1c9',
  '#0099b0'
];

export const theme = createTheme({
  colors: {
    green,
    blue
  },
  fontFamily: 'Roboto, sans-serif',
  primaryColor: 'green',
});
