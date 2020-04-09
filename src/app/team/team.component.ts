import { Component, OnInit } from '@angular/core';
import {TeamServiceService} from "../team-service.service";
import {Team} from "../Team";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team: Team;

  constructor(private teamService: TeamServiceService) {

  }

  ngOnInit(): void {
    this.getTeamByID('5e7297dbe030e03477414841');
  }


  getTeamByID(id: string)
  {
    this.teamService.getTeamById(id).subscribe(team =>{
      this.team = team;
      console.log(this.team);
    });
  }
}
