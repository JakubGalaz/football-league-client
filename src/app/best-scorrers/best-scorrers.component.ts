import { Component, OnInit } from '@angular/core';
import {Player} from "../Player";
import {PlayerServiceService} from "../player-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-best-scorrers',
  templateUrl: './best-scorrers.component.html',
  styleUrls: ['./best-scorrers.component.css']
})
export class BestScorrersComponent implements OnInit {

  allPlayers: Player[];
  topPlayers: Player[];
  sortedData: Player[];

  constructor(private playerService: PlayerServiceService) { }

  ngOnInit(): void {
    this.getPlayers();




  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(player => {
      this.topPlayers = player;
      console.log(this.topPlayers);

      this.allPlayers = this.topPlayers.slice(0,10);
      this.allPlayers.sort((a, b) => (a.goals < b.goals) ? 1 : -1)
      this.sortedData = this.allPlayers.slice(0, 10);
    });
  }


  sortData(sort: Sort) {
    const data = this.allPlayers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'goal':
          return compare(a.goals, b.goals, isAsc);
        case 'assists':
          return compare(a.assists, b.assists, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'surname':
          return compare(a.surname, b.surname, isAsc);
        case 'club':
          return compare(a.club, b.club, isAsc);
        case 'age':
          return compare(a.age, b.age, isAsc);
        case 'position':
          return compare(a.position, b.position, isAsc);
        default:
          return 0;
      }
    });
  }



}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
