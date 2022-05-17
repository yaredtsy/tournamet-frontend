interface PlayersType {
  name: string;
  score: number;
  rank: number;
  reward: string;
  id: string;
}

interface TournamentType {
  enteringFee: number;
  minPlayers: number;
  endesAt: number;
  state: string;
  price: PriceType[];
  id: string;
  totalPlayers: number;
}

interface PriceType {
  price: string;
  rank: number;
}

interface ScoreBoardType {
  players: PlayersType[] | null;
  tournament: TournamentType | null;
  isLoading: boolean;
  error: string | null;
}
