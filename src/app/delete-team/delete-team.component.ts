import { Component, OnInit, ViewChild } from "@angular/core";
import { TeamServiceService } from "../team-service.service";
import { Team } from "../Team";

import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-delete-team",
  templateUrl: "./delete-team.component.html",
  styleUrls: ["./delete-team.component.css"],
})
export class DeleteTeamComponent implements OnInit {
  allTeams: Team[];

  constructor(private teamService: TeamServiceService) {}

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().subscribe((teams) => {
      this.allTeams = teams;
      console.log(this.allTeams);
    });
  }

  deleteTeamByID(id: string) {
    this.teamService.deleteTeamById(id).subscribe((team) => {
      console.log("Delete team by id");
      console.log(team);
      window.location.reload();
    });
  }
}
