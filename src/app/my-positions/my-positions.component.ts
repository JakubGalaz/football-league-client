import { Component, OnInit } from "@angular/core";
import { MyPositionServiceService } from "../my-position-service.service";
import { FavouritePosition } from "../FavouritePosition";
import { AuthService } from "../auth.service";
import { TeamServiceService } from "../team-service.service";
import { PlayerServiceService } from "../player-service.service";
import { Player } from "../Player";
import { Team } from "../Team";
import { strict } from "assert";

@Component({
  selector: "app-my-positions",
  templateUrl: "./my-positions.component.html",
  styleUrls: ["./my-positions.component.css"],
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

  constructor(
    private myPositionServiceService: MyPositionServiceService,
    private authService: AuthService,
    private teamServiceService: TeamServiceService,
    private playerServiceService: PlayerServiceService
  ) {}

  ngOnInit(): void {
    this.myPositionServiceService.getPositions().subscribe((position) => {
      this.allPosition = position;
      console.log(this.authService.user.email.toString());
      this.myPosition = this.allPosition.filter(
        (allPosition) =>
          allPosition.email === this.authService.user.email.toString()
      );
      this.positionsTeams = this.myPosition.filter(
        (myPosition) => myPosition.type === "team"
      );
      this.positionsPlayers = this.myPosition.filter(
        (myPosition) => myPosition.type === "player"
      );
      this.getAllTeams(this.positionsTeams);
      this.getAllPlayers(this.positionsPlayers);
    });
  }

  getAllTeams(positions: FavouritePosition[]) {
    this.teamServiceService.getTeams().subscribe((team) => {
      this.allTeams = team;
      for (let i = 0; i < positions.length; i++) {
        for (let a = 0; a < this.allTeams.length; a++) {
          if (
            positions[i].idPosition.toString() ===
            this.allTeams[a].id.toString()
          ) {
            if (this.teams === undefined) {
              this.teams = [this.allTeams[0]];
            } else {
              this.teams.push(this.allTeams[a]);
            }
          }
        }
      }
    });
  }

  getAllPlayers(positions: FavouritePosition[]) {
    this.playerServiceService.getPlayers().subscribe((player) => {
      this.allPlayer = player;

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < positions.length; i++) {
        for (let a = 0; a < this.allPlayer.length; a++) {
          if (
            positions[i].idPosition.toString() ===
            this.allPlayer[a].id.toString()
          ) {
            if (this.players === undefined) {
              this.players = [this.allPlayer[0]];
            } else {
              this.players.push(this.allPlayer[a]);
            }
          }
        }
      }
    });
  }

  deleteMyPosition(idTeam) {
    const position: FavouritePosition[] = this.positionsTeams.filter(
      (myPosition) => myPosition.idPosition === idTeam
    );
    console.log("id druzyny" + idTeam);
    console.log(position[0].id);
    this.myPositionServiceService
      .deletePositionById(position[0].id.toString())
      .subscribe((position) => {
        console.log(position);
      });
    //window.location.reload();
  }

  deleteMyPlayer(idPlayer) {
    console.log("idplayer:" + idPlayer);
    const position: FavouritePosition[] = this.positionsTeams.filter(
      (myPosition) => myPosition.idPosition === idPlayer
    );
    // tslint:disable-next-line:no-shadowed-variable
    this.myPositionServiceService
      .deletePositionById(position[0].id.toString())
      .subscribe((position) => {
        console.log(position);
      });
    //window.location.reload();
  }
}
