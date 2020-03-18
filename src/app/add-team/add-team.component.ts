import { Component, OnInit } from "@angular/core";
import { PlayerServiceService } from "../player-service.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Player } from "../Player";
import { Sort } from "@angular/material/sort";
import { Team } from "../Team";
import {TeamServiceService} from "../team-service.service";

@Component({
  selector: "app-add-team",
  templateUrl: "./add-team.component.html",
  styleUrls: ["./add-team.component.css"]
})
export class AddTeamComponent implements OnInit {
  teamForm: FormGroup;
  players: Player[];
  selectedPlayers: Player[];
  displayInput: false;
  sortedData: Player[];

  constructor(private playerService: PlayerServiceService, private teamService: TeamServiceService) {}

  ngOnInit(): void {
    this.getPlayers();



    this.teamForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      coach: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      stadium: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ])
    });
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players;
      this.sortedData = this.players.slice(0);

    });


  }

  addPlayers() {
    this.selectedPlayers = this.players.filter(
      players => players.club === this.teamForm.value.name
    );

    document.getElementById("addPlayers").style.display = "block";
    this.teamForm.disable();
  }


  sortData(sort: Sort) {
    const data = this.selectedPlayers.slice();
    console.log(data)
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'surname':
          return compare(a.surname, b.surname, isAsc);
        case 'age':
          return compare(a.age, b.age, isAsc);
        case 'position':
          return compare(a.position, b.position, isAsc);
        default:
          return 0;
      }
    });
  }

  onSumbit() {
    console.log("onSubmit");
    const team: Team = {
      name: this.teamForm.value.name,
      coach: this.teamForm.value.coach,
      stadium: this.teamForm.value.stadium,
      players: this.selectedPlayers
    };

    this.teamService.postTeam(team).subscribe( myTeam => {
      console.log("Wysłaon: " + myTeam);
      },
      err => {
        console.log(err);

      });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
