import { Component, OnInit } from '@angular/core';
import {MyPositionServiceService} from "../my-position-service.service";
import {FavouritePosition} from "../FavouritePosition";
import {AuthService} from "../auth.service";
import {TeamServiceService} from "../team-service.service";
import {PlayerServiceService} from "../player-service.service";
import {Player} from "../Player";
import {Team} from "../Team";

@Component({
  selector: 'app-my-positions',
  templateUrl: './my-positions.component.html',
  styleUrls: ['./my-positions.component.css']
})
export class MyPositionsComponent implements OnInit {
allPosition: FavouritePosition[];
myPosition: FavouritePosition[];
positionsTeams: FavouritePosition[];
positionsPlayers: FavouritePosition[];
positionMatch: FavouritePosition[];
myTeams: FavouritePosition[];
myPlayers: FavouritePosition[];
myMatch: FavouritePosition[];
allPlayer: Player[];
allTeams: Team[];
teams: Team[];
players: Player[];



  constructor(private myPositionServiceService: MyPositionServiceService, private  authService: AuthService,
              private  teamServiceService: TeamServiceService, private playerServiceService: PlayerServiceService) { }

  ngOnInit(): void {
    this.myPositionServiceService.getPositions().subscribe( position => {
      this.allPosition = position;
      this.myPosition = this.allPosition.filter( allPosition => allPosition.email === this.authService.user.email.toString())
      console.log(this.myPosition);
     // this.getAllTeams();
   //   this.getAllPlayers();
      //this.positionsTeams = this.myPosition.filter( myPosition => myPosition.type === 'team')
      //console.log(this.positionsTeams);


    });
  }
  getAllTeams(){
    this.teamServiceService.getTeams().subscribe(team => {
      this.allTeams = team;
    });
  }

  getAllPlayers(){
    this.playerServiceService.getPlayers().subscribe( player =>{
      this.allPlayer = player;
    });
  }


}
