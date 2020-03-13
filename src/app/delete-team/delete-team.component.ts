import { Component, OnInit, ViewChild } from "@angular/core";
import { TeamServiceService } from "../team-service.service";
import { Team } from "../Team";

import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-delete-team",
  templateUrl: "./delete-team.component.html",
  styleUrls: ["./delete-team.component.css"]
})
export class DeleteTeamComponent implements OnInit {
  allTeams: Team[];

  constructor(private teamService: TeamServiceService) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().subscribe(teams => {
      this.allTeams = teams;
      console.log(this.allTeams);
    });
  }
}
