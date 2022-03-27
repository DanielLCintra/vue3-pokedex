interface Sprites {
  front_default: string, 
}

interface Type {
  name: string,
  url: string
}

interface Types {
  slot: number,
  type: Type
}

interface Stat {
  name: string,
  url: string,
}
interface Stats {
  base_stat: number,
  effort: number,
  stat: Stat
}

interface Move {
  name: string,
  url: string,
}
interface Moves {
  move: Move
}
interface Pokemon {
  id: string,
  name: string,
  url: string,
  image: string,
  sprites: Sprites,
  types: Array<Types>,
  stats: Array<Stats>
  moves: Array<Moves>
}

export default Pokemon