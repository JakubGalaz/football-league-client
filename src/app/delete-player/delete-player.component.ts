import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayerServiceService} from "../player-service.service";
import {Player} from "../Player";
import {MatSort, Sort} from "@angular/material/sort";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getMatIconFailedToSanitizeLiteralError} from "@angular/material/icon";

@Component({
  selector: 'app-delete-player',
  templateUrl: './delete-player.component.html',
  styleUrls: ['./delete-player.component.css']
})
export class DeletePlayerComponent implements OnInit {
  allPlayers: Player[];
  sortedData: Player[];
  surnameForm: FormGroup;
  isSearched: boolean;




  constructor(private playerService: PlayerServiceService) {


  }

  ngOnInit(): void {
    this.getPlayers();
    this.isSearched = true;

    this.surnameForm = new FormGroup({
      surname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ])});

  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(player => {
      this.allPlayers = player;
      console.log(this.allPlayers);
      this.sortedData = this.allPlayers.slice();

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

  deletePlayerById(id: string) {
    this.playerService.deletePlayerById(id).subscribe(player => {
      console.log('Delete team by id');
      console.log(player);
      //window.location.reload();
    });
  }

  footballerSurname(){
   const surname =  this.surnameForm.value.surname;
this.isSearched = false;
  }

  showAllFootballer(){
    this.isSearched = true;
  }


}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
