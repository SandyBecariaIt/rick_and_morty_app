
export interface response {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  },
  results: Film[]
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