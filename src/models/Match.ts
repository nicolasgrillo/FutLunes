import { User } from "./models";

export class Match {
    Id : number;
    Title : string;
    MapUrl : string;
    MatchDate : Date;
    Limit : number;
    Open : boolean;
    Players : User[];
}