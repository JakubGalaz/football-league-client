import { Component, OnInit } from "@angular/core";
import { PlayerServiceService } from "../player-service.service";
import { Player } from "../Player";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FavouritePosition } from "../FavouritePosition";
import { AuthService } from "../auth.service";
import { MyPositionServiceService } from "../my-position-service.service";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"],
})
export class PlayerComponent implements OnInit {
  player: Player;
  private routeSub: Subscription;

  constructor(
    private playerService: PlayerServiceService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private myPositionServiceService: MyPositionServiceService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(params); //log the entire params object
      console.log(params["id"]); //log the value of id

      this.getPlayerById(params["id"]);
    });
  }

  getPlayerById(id: string) {
    this.playerService.findPlayerById(id).subscribe((player) => {
      this.player = player;
      console.log(this.player);
    });
  }

  addToFavourite() {
    const myPosition: FavouritePosition = {
      email: this.authService.user.email.toString(),
      type: "player",
      idPosition: this.player.id,
    };

    this.myPositionServiceService.postPosition(myPosition).subscribe(
      (data) => console.log("success", data),
      (error) => console.log("oops", error)
    );

    this.router.navigate(["/myPositions"]);
  }
}
