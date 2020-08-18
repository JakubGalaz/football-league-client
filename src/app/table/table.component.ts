import { Component, OnInit } from "@angular/core";
import { ProtocolServiceService } from "../protocol-service.service";
import { Protocol } from "../Protocol";
import { TeamServiceService } from "../team-service.service";
import { Team } from "../Team";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  protocols: Protocol[];
  teams: Team[];

  constructor(
    private protocolServcie: ProtocolServiceService,
    private teamServiceService: TeamServiceService
  ) {}

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.teamServiceService.getTeams().subscribe((team) => {
      this.teams = team;
      this.teams = this.teams.sort((a, b) =>
        a.win * 3 + a.draw < b.win * 3 + b.draw
          ? 1
          : a.win * 3 + a.draw === b.win * 3 + b.draw
          ? a.goalsScored - a.goalLost < b.goalsScored - b.goalLost
            ? 1
            : -1
          : -1
      );
    });
  }
}
