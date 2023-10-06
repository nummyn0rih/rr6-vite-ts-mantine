import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Group, Burger, Button, UnstyledButton, Image } from '@mantine/core';
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
  const navigate = useNavigate();

  const items = links.map((link) => (
    <UnstyledButton key={link.label}>
      <Button
        component="a"
        className={classes.link}
        data-active={active === link.link || undefined}
        leftSection={link.icon}
        onClick={(event) => {
          event.preventDefault();
          setActive(link.link);
          navigate(link.link)
        }}
      >
        {link.label}
      </Button>
    </UnstyledButton>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" justify-content="center" className={classes.inner}>
        <Image
          radius="md"
          h={40}
          src="https://rick-i-morty.online/wp-content/uploads/2019/12/logo-rick-morty.jpg"
        />

        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

        <Login />

        <ColorSchemeButton/>
      </Container>
    </header>
  );
}