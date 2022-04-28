interface PlayersType {
    name:string;
    score:number;
    rank:number;
    reward:string;
}

interface TournamentType{
    enteringFee:number;
    minPlayers: number;
    endesAt:number;
    state: string;
    price: PriceType[];
    id: string;
}

interface PriceType{
    price:string;
    rank:number;
}

interface ScoreBoardType{
    players: PlayersType[] | null;
    tournament: TournamentType | null;
    isLoading: boolean;
    error: string|null;
}