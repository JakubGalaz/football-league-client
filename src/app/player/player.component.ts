import { Component, OnInit } from '@angular/core';
import {PlayerServiceService} from "../player-service.service";
import {Player} from "../Player";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  player: Player;
  private routeSub: Subscription;

  constructor(private playerService: PlayerServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id

    this.getPlayerById(params['id']);
    });
  }

  getPlayerById(id: string){
    this.playerService.findPlayerById(id).subscribe( player =>{
      this.player = player;
      console.log(this.player);
    });
  }
}
