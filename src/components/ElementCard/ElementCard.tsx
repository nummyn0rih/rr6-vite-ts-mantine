import { Center, Card, Image, Title, Divider, Text, Group, Stack } from '@mantine/core';

type Props = {
  element: {
    name: string
    type: string
    image?: string
    status?: string
    species?: string
    gender?: string
    air_date?: string
    episode?: string
    dimension?: string
  }
};

export function ElementCard({ element }: Props) {
  return (
    <Center mt={10}>
      <Card
        shadow="md"
        padding="xl"
        withBorder
      >
        <Group>
          {element.image && 
            <Image
              src={element.image}
              alt={element.name}
              radius="sm"
              mr={20}
            />
          }

          <Stack>
            <Title order={1} mt="md">{element.name}</Title>
            <Divider size="md" m="md" />

            {element.status && <Text size="xl">Статус: {element.status}</Text>}
            {element.species && <Text size="xl">Вид: {element.species}</Text>}
            {element.type && <Text size="xl">Тип: {element.type}</Text>}
            {element.gender && <Text size="xl">Пол: {element.gender}</Text>}
            {element.air_date && <Text size="xl">Дата выхода: {element.air_date}</Text>}
            {typeof element.episode === 'string' &&  <Text size="xl">Номер: {element.episode}</Text>}
            {element.dimension && <Text size="xl">Измерение: {element.dimension}</Text>}
          </Stack>
        </Group>
      </Card>
    </Center>
  );
}
