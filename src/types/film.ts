
export interface response {
  info: Info,
  results: Film[]
}

export interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface Film {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  location: Location,
  image: string,
}

interface Location {
  name: string;
  url: string;
}