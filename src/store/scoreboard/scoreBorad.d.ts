interface PlayersType {
  name: string;
  score: number;
  rank: number;
  reward: string;
  id: string;
  phoneNumber: string;
  createdAt: Timestamp;
  token: any | null;
}

interface PlayersJoinType {
  name: string;

  rank: number;
  reward: string;
  id: string;
  phoneNumber: string;
  createdAt: Timestamp;
  token: any | null;
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
  value: number;
  rank: number;
  gameZonePrice: string;
}

interface ScoreBoardType {
  players: PlayersType[] | null;
  tournament: TournamentType | null;
  isLoading: boolean;
  error: string | null;
}
