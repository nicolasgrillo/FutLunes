import { User } from "./models";

export class Match {
    Id : number;
    Title : string;
    MapUrl : string;
    MatchDate : Date;
    Limit : number;
    Players : User[];
}