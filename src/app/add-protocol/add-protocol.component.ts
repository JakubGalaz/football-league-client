import { Component, OnInit } from "@angular/core";
import { TeamServiceService } from "../team-service.service";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Team } from "../Team";
import { Player } from "../Player";
import { Goal } from "../Goal";
import { PlayerServiceService } from "../player-service.service";
import { Protocol } from "../Protocol";

@Component({
  selector: "app-add-protocol",
  templateUrl: "./add-protocol.component.html",
  styleUrls: ["./add-protocol.component.css"]
})
export class AddProtocolComponent implements OnInit {
  protocolForm: FormGroup;
  hostPlayersForm: FormGroup;
  guestPlayersForm: FormGroup;
  Protocol: Protocol;
  allTeams: Team[];
  allPlayers: Player[];
  aviableTeams: Team[];
  hostGoals: Goal[];
  refree: string;
  comments: string;
  hostPlayers: Player[];
  guestPlayers: Player[];
  hostDisabled: false;
  guestDisabled: false;
  isHome: boolean;
  guestGoalForm: FormGroup;
  hostGoalForm: FormGroup;

  guestGoals: Goal[];

  constructor(
    private teamService: TeamServiceService,
    private playerService: PlayerServiceService
  ) {}

  ngOnInit(): void {
    this.getTeams();
    this.getPlayers();
    this.isHome = true;

    this.protocolForm = new FormGroup({
      refree: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      host: new FormControl(this.allTeams, [Validators.required]),
      guest: new FormControl(null, [Validators.required])
    });

    this.hostPlayersForm = new FormGroup({
      hostGoalkeeper: new FormControl("", [Validators.required]),
      hostRightDefender: new FormControl("", [Validators.required]),
      hostLeftDefender: new FormControl("", [Validators.required]),
      hostLeftMidDefender: new FormControl("", [Validators.required]),
      hostRightMidDefender: new FormControl("", [Validators.required]),
      hostLeftMid: new FormControl("", [Validators.required]),
      hostRightMid: new FormControl("", [Validators.required]),
      hostMidfielder: new FormControl("", [Validators.required]),
      hostRightWinger: new FormControl("", [Validators.required]),
      hostLeftWinger: new FormControl("", [Validators.required]),
      hostStricker: new FormControl("", [Validators.required])
    });

    this.guestPlayersForm = new FormGroup({
      guestGoalkeeper: new FormControl("", [Validators.required]),
      guestRightDefender: new FormControl("", [Validators.required]),
      guestLeftDefender: new FormControl("", [Validators.required]),
      guestLeftMidDefender: new FormControl("", [Validators.required]),
      guestRightMidDefender: new FormControl("", [Validators.required]),
      guestLeftMid: new FormControl("", [Validators.required]),
      guestRightMid: new FormControl("", [Validators.required]),
      guestMidfielder: new FormControl("", [Validators.required]),
      guestRightWinger: new FormControl("", [Validators.required]),
      guestLeftWinger: new FormControl("", [Validators.required]),
      guestStricker: new FormControl("", [Validators.required])
    });

    this.guestGoalForm = new FormGroup({
      guestStricker: new FormControl("", [Validators.required]),
      guestAssitant: new FormControl("", [Validators.required]),
      guestGoalMinute: new FormControl("", [
        Validators.required,
        CustomValidator.numeric,
        Validators.max(90),
        Validators.min(1)
      ])
    });

    this.hostGoalForm = new FormGroup({
      hostScorrer: new FormControl("", [Validators.required]),
      hostAssitant: new FormControl("", [Validators.required]),
      hostGoalMinute: new FormControl("", [
        Validators.required,
        CustomValidator.numeric,
        Validators.max(90),
        Validators.min(1)
      ])
    });
  }

  getTeams() {
    this.teamService.getTeams().subscribe(teams => {
      this.allTeams = teams;
    });
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(players => {
      this.allPlayers = players;
    });
  }

  selectHost(event) {
    console.log(event.value);
    this.aviableTeams = this.allTeams.slice(0);
    const index = this.allTeams.findIndex(
      i => i.name === this.protocolForm.value.host
    );

    if (index > -1) {
      this.aviableTeams.splice(index, 1);
    }

    console.log(this.aviableTeams);
    console.log(this.allTeams);
  }

  addPlayers() {
    this.hostPlayers = this.allPlayers.filter(
      player => player.club === this.protocolForm.value.host
    );

    this.guestPlayers = this.allPlayers.filter(
      player => player.club === this.protocolForm.value.guest
    );
  }

  selectHostGoalkeeper($event) {}

  addHostGoal() {
    const goal: Goal = {
      scorrer: this.hostGoalForm.value.hostScorrer,
      asistant: this.hostGoalForm.value.hostAssitant,
      minute: this.hostGoalForm.value.hostGoalMinute
    };

    if (this.hostGoals === undefined) {
      this.hostGoals = [goal];
    } else {
      this.hostGoals.push(goal);
    }

    this.guestGoalForm.reset();
    this.hostGoalForm.reset();
  }

  addGuestGoal() {
    const goal: Goal = {
      scorrer: this.guestGoalForm.value.guestStricker,
      asistant: this.guestGoalForm.value.guestAssitant,
      minute: this.guestGoalForm.value.guestGoalMinute
    };

    if (this.guestGoals === undefined) {
      this.guestGoals = [goal];
    } else {
      this.guestGoals.push(goal);
    }

    this.guestGoalForm.reset();
    this.hostGoalForm.reset();

    console.log;
  }

  homeOrAway() {
    // tslint:disable-next-line: no-unused-expression
    this.isHome = !this.isHome;
  }

  createProtocol() {
    this.Protocol = {
      host: this.protocolForm.value.host,
      guest: this.protocolForm.value.guest,
      refree: this.protocolForm.value.refree,
      guestGoals: this.guestGoals,
      hostGoals: this.hostGoals
    };

    console.log(this.Protocol);
  }
}

export class CustomValidator {
  // Number only validation
  static numeric(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === "") return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
      return { invalidNumber: true };

    return null;
  }
}
