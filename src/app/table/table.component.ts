import { Component, OnInit } from '@angular/core';
import {ProtocolServiceService} from "../protocol-service.service";
import {Protocol} from "../Protocol";
import {TeamServiceService} from "../team-service.service";
import {Team} from "../Team";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  protocols: Protocol[];
  teams: Team[];


constructor(private  protocolServcie: ProtocolServiceService, private teamServiceService: TeamServiceService) { }

  ngOnInit(): void {


this.getTeams();

  }



  getTeams() {
    this.teamServiceService.getTeams().subscribe(team => {
      this.teams = team;
      console.log(this.teams);
      console.log(this.teams[1].id);
    });
  }







}
