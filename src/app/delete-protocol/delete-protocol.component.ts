import { Component, OnInit } from '@angular/core';
import {Protocol} from "../Protocol";
import {ProtocolServiceService} from "../protocol-service.service";
import {Sort} from "@angular/material/sort";
import {TeamServiceService} from "../team-service.service";
import {Team} from "../Team";
import {PlayerServiceService} from "../player-service.service";
import {Player} from "../Player";

@Component({
  selector: 'app-delete-protocol',
  templateUrl: './delete-protocol.component.html',
  styleUrls: ['./delete-protocol.component.css']
})
export class DeleteProtocolComponent implements OnInit {
  allProtocols: Protocol[];
  protocol: Protocol;
  sortedData: Protocol[];
  allTeam: Team[];


  constructor(private protocolService: ProtocolServiceService, private teamServiceService: TeamServiceService,
              private playerServiceService: PlayerServiceService) {
  }

  ngOnInit(): void {
    this.getProtocols();
    this.getTeams();
  //  this.getPlayers();

  }

  getProtocols() {
    this.protocolService.getProtocols().subscribe(protocol => {
      this.allProtocols = protocol;
      this.sortedData = this.allProtocols.slice();
    });
  }

  deleteProtocolById(id: string) {
  /*  this.protocolService.deleteProtocolById(id).subscribe(protocol => {
      console.log('Usuwanie protokolu');
      console.log(protocol)

    });
    console.info(id)
    // window.location.reload();
    */
   this.updateTeam(id);
   this.updatePlayer(id);
  }


  sortData(sort: Sort) {
    const data = this.allProtocols.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'host':
          return compare(a.host, b.host, isAsc);
        case 'guest':
          return compare(a.guest, b.guest, isAsc);
        case 'refree':
          return compare(a.refree, b.refree, isAsc);
        default:
          return 0;
      }
    });
  }

  updateTeam(id) {
    var protcocol: Protocol = this.allProtocols.find(a => a.id === id);
    const host: Team = this.allTeam.find( a => a.name === protcocol.host);
    const guest: Team = this.allTeam.find( a => a.name === protcocol.guest);
    var hostGoals = 0;
    var guestGoals = 0;

    if(protcocol.hostGoals !== undefined){
      hostGoals = protcocol.hostGoals.length;
      host.goalsScored = host.goalsScored - hostGoals;
      host.goalLost = host.goalLost + hostGoals;
    }
    if(protcocol.guestGoals !== undefined){
      guestGoals = protcocol.guestGoals.length;
      guest.goalsScored = guest.goalsScored - guestGoals;
      guest.goalLost = guest.goalLost + guestGoals;
    }

    if (hostGoals ===  guestGoals) {
      host.draw = host.draw - 1;
      guest.draw = guest.draw - 1;

    } else if (hostGoals < guestGoals) {

      host.lose = host.lose - 1;
      guest.win = guest.win - 1;

    } else if (hostGoals > guestGoals) {
      host.win = host.win - 1;
      guest.lose = guest.lose - 1;
    }





    this.teamServiceService.updateTeam(host).subscribe( a => {
      console.log(a);
    });


    this.teamServiceService.updateTeam(guest).subscribe( a => {
      console.log(a);
    });

  }

  getTeams(){
    this.teamServiceService.getTeams().subscribe( team => {
      this.allTeam = team;
    });
  }



  updatePlayer(id) {
    var protcocol: Protocol = this.allProtocols.find(a => a.id === id);
    var player: Player;
    var assistant: Player;


    console.log(protcocol.hostGoals)

    if (protcocol.hostGoals !== undefined) {

      for (let i = 0; i < protcocol.hostGoals.length; i++) {
        player = protcocol.hostGoals[i].scorer;
        player.goals = player.goals - 1;
        assistant = protcocol.hostGoals[i].assistant;
        assistant.goals = assistant.goals - 1;
        this.playerServiceService.updatePlayer(player).subscribe(a => {
          console.log(a);
        });

        this.playerServiceService.updatePlayer(assistant).subscribe(a => {
          console.log(a);
        });
      }
    }


    if (protcocol.hostCards !== undefined) {
      for (let i = 0; i < protcocol.hostCards.length; i++) {
        player = protcocol.hostCards[i].player;
        if (protcocol.hostCards[i].card.toString() === 'czerwona') {
          player.redCards = player.redCards - 1;
        } else {
          player.yellowCards = player.yellowCards - 1;
        }

        this.playerServiceService.updatePlayer(player).subscribe(a => {
          console.log(a);
        });

      }

    }


    if (protcocol.guestGoals !== undefined) {

      for (let i = 0; i < protcocol.guestGoals.length; i++) {
        player = protcocol.guestGoals[i].scorer;
        player.goals = player.goals - 1;
        assistant = protcocol.guestGoals[i].assistant;
        assistant.goals = assistant.goals - 1;
        this.playerServiceService.updatePlayer(player).subscribe(a => {
          console.log(a);
        });

        this.playerServiceService.updatePlayer(assistant).subscribe(a => {
          console.log(a);
        });
      }


    }

    if (protcocol.guestCards !== undefined) {
      for (let i = 0; i < protcocol.guestCards.length; i++) {
        player = protcocol.guestCards[i].player;
        if (protcocol.guestCards[i].card === 'czerwona') {
          player.redCards = player.redCards - 1;
        } else {
          player.yellowCards = player.yellowCards - 1;
        }

        this.playerServiceService.updatePlayer(player).subscribe(a => {
          console.log(a);
        });

      }

    }






  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

