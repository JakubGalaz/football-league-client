import { Component, OnInit } from "@angular/core";
import { TeamServiceService } from "../team-service.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Team } from "../Team";
import { Player } from "../Player";
import { Goal } from "../Goal";
import { PlayerServiceService } from "../player-service.service";

@Component({
  selector: "app-add-protocol",
  templateUrl: "./add-protocol.component.html",
  styleUrls: ["./add-protocol.component.css"]
})
export class AddProtocolComponent implements OnInit {
  protocolForm: FormGroup;
  hostPlayersForm: FormGroup;
  guestPlayersForm: FormGroup;
  allTeams: Team[];
  allPlayers: Player[];
  aviableTeams: Team[];
  hostGoals: Goal[];
  refree: string;
  comments: string;
  hostPlayers: Player[];
  guestPlayers: Player[];
  hostDisabled: false;
  guestDisabled: false;
  hostGoalkeeper: Player = {
    name: ""
  };

  constructor(
    private teamService: TeamServiceService,
    private playerService: PlayerServiceService
  ) {}

  ngOnInit(): void {
    this.getTeams();
    this.getPlayers();

    this.protocolForm = new FormGroup({
      refree: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      host: new FormControl(this.allTeams, [Validators.required]),
      guest: new FormControl(null, [Validators.required])
    });

    this.hostPlayersForm = new FormGroup({
      hostGoalkeeper: new FormControl(null, [Validators.required])
    });
  }

  getTeams() {
    this.teamService.getTeams().subscribe(teams => {
      this.allTeams = teams;
    });
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(players => {
      this.allPlayers = players;
    });
  }

  selectHost(event) {
    console.log(event.value);
    this.aviableTeams = this.allTeams.slice(0);
    const index = this.allTeams.findIndex(
      i => i.name === this.protocolForm.value.host
    );

    if (index > -1) {
      this.aviableTeams.splice(index, 1);
    }

    console.log(this.aviableTeams);
    console.log(this.allTeams);
  }

  addPlayers() {
    this.hostPlayers = this.allPlayers.filter(
      player => player.club === this.protocolForm.value.host
    );

    this.guestPlayers = this.allPlayers.filter(
      player => player.club === this.protocolForm.value.guest
    );

    console.log(this.hostPlayers);
    console.log(this.guestPlayers);
  }

  selectHostGoalkeeper($event) {
    this.hostGoalkeeper = this.hostPlayersForm.value.hostGoalkeeper;
  }
}
