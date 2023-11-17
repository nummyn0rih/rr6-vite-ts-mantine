import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Container, Stack, Group, Burger, Button, UnstyledButton, Image, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome, IconUsers, IconMap2, IconMovie  } from "@tabler/icons-react";

import { Login, ColorSchemeButton } from '..';

import classes from './Header.module.css';

const links = [
  { link: '/', label: 'Домой', icon: <IconHome/> },
  { link: '/characters', label: 'Герои', icon: <IconUsers/> },
  { link: '/locations', label: 'Локации', icon: <IconMap2/> },
  { link: '/episodes', label: 'Эпизоды', icon: <IconMovie/> },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const handleClick = (link: string): undefined => {
    setActive(link);
    toggle();
  }

  const items = links.map((link) => (
    <UnstyledButton key={link.label}>
      <Button
        component={NavLink}
        to={link.link}
        className={classes.link}
        data-active={active === link.link || undefined}
        leftSection={link.icon}
        onClick={() => handleClick(link.link)}
      >
        {link.label}
      </Button>
    </UnstyledButton>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" justify-content="center" className={classes.inner} mt={10} mb={10}>
        <Stack w={"100%"}>
          <Group justify="space-between">
            <Image
              radius="md"
              h={40}
              // visibleFrom="sm"
              src="https://rick-i-morty.online/wp-content/uploads/2019/12/logo-rick-morty.jpg"
              />

            <Group gap={5} visibleFrom="xs">
              {items}
            </Group>

            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            <Box visibleFrom="xs">
              <Login />
            </Box>

            <Box visibleFrom="xs">
              <ColorSchemeButton />
            </Box>
          </Group>
          {opened && <Stack hiddenFrom="xs" gap="xs">
            <Box
              style={{
                display: 'flex',
                'justify-content': 'end'
              }}
            >
              <Login />
            </Box>
            {items}
          </Stack>}
        </Stack>
      </Container>
    </header>
  );
}