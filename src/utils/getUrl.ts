interface UrlMap {
  [key: string]: string
}

export default function getUrl(name: string): string {
  const urls: UrlMap = {
    characters: 'https://rickandmortyapi.com/api/character',
    locations: 'https://rickandmortyapi.com/api/location',
    episodes: 'https://rickandmortyapi.com/api/episode',
  };

  return urls[name];
}
