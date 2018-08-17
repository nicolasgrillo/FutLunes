import { User } from "./models";

export class Match {
    Title : string;
    MapUrl : string;
    MatchDate : Date;
    Limit : number;
    Players : User[];
}