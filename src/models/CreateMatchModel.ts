import { Match } from "./models";

export class CreateMatchModel {
    LocationTitle : string;
    LocationMapUrl : string;
    MatchDate : Date;
    PlayerLimit : number;

    constructor(match? : Match) {   
        if (match != null){
            this.LocationMapUrl = match.locationMapUrl;
            this.LocationTitle = match.locationTitle;
            this.MatchDate = match.matchDate;
            this.PlayerLimit = match.playerLimit;
        }     
        else {
            this.LocationMapUrl = '';
            this.LocationTitle = '';
            this.MatchDate = new Date();
            this.PlayerLimit = 10;
        }
        
    }
}