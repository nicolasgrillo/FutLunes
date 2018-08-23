interface PlayerInMatch {
    id : number;
    subscriptionDate : Date;
    user: string;
}

export class Match {
    id : number;
    locationTitle : string;
    locationMapUrl : string;
    matchDate : Date;
    playerLimit : number;
    open : boolean;
    players : PlayerInMatch[];
}