import { Component, OnInit } from '@angular/core';
import {TeamServiceService} from '../team-service.service';
import {Team} from '../Team';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MyPositionsComponent} from '../my-positions/my-positions.component';
import {MyPositionServiceService} from '../my-position-service.service';
import {FavouritePosition} from '../FavouritePosition';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team: Team;
  private routeSub: Subscription;
  idTeam: string;
  constructor(private teamService: TeamServiceService, private route: ActivatedRoute,
              private myPositionServiceService: MyPositionServiceService, public  authService: AuthService) {

  }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params); // log the entire params object
      console.log(params.id); // log the value of id
      this.idTeam = params.id;
      this.getTeamByID(params.id);
    });
  }


  getTeamByID(id: string) {
    this.teamService.getTeamById(id).subscribe(team => {
      this.team = team;
      console.log(this.team);
    });
  }

  addToFavourite() {
    const myPosition: FavouritePosition = {
      email: this.authService.user.email.toString(),
      type: 'team',
      idPosition: this.idTeam
    }

    this.myPositionServiceService.postPosition(myPosition).subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    );
  }
}
