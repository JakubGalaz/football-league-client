import { Component, OnInit } from '@angular/core';
import {PlayerServiceService} from "../player-service.service";
import {Player} from "../Player";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  player: Player;

  constructor(private playerService: PlayerServiceService) { }

  ngOnInit(): void {
    this.getPlayerById("583");
  }

  getPlayerById(id: string){
    this.playerService.findPlayerById(id).subscribe( player =>{
      this.player = player;
      console.log(this.player);
    });
  }
}
