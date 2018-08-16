import { PlayerModel } from "./models";

export class MatchModel {
    Title : string;
    MapUrl : string;
    MatchDate : Date;
    Limit : number;
    Players : PlayerModel[];
}