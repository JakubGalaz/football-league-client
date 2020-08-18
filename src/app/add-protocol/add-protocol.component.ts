import { Component, OnInit } from "@angular/core";
import { TeamServiceService } from "../team-service.service";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from "@angular/forms";
import { Team } from "../Team";
import { Player } from "../Player";
import { Goal } from "../Goal";
import { PlayerServiceService } from "../player-service.service";
import { Protocol } from "../Protocol";
import { PlayerChange } from "../PlayerChange";
import { DatePipe } from "@angular/common";
import { ProtocolServiceService } from "../protocol-service.service";
import { Card } from "../Card";

@Component({
  selector: "app-add-protocol",
  templateUrl: "./add-protocol.component.html",
  styleUrls: ["./add-protocol.component.css"],
})
export class AddProtocolComponent implements OnInit {
  protocolForm: FormGroup;
  hostPlayersForm: FormGroup;
  guestPlayersForm: FormGroup;
  hostChange: PlayerChange[];
  guestChange: PlayerChange[];
  Protocol: Protocol;
  allTeams: Team[];
  allPlayers: Player[];
  aviableTeams: Team[];
  hostGoals: Goal[];
  refree: string;
  comments: string;
  hostPlayers: Player[];
  guestPlayers: Player[];
  isHome: boolean;
  guestGoalForm: FormGroup;
  hostGoalForm: FormGroup;
  guestChangeForm: FormGroup;
  hostChangeForm: FormGroup;
  hostCardForm: FormGroup;
  guestCardForm: FormGroup;
  guestGoals: Goal[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  hostCard: Card[];
  guestCard: Card[];
  minDate = new Date(2019, 9, 1);
  maxDate = new Date(2020, 6, 15);

  constructor(
    private teamService: TeamServiceService,
    private playerService: PlayerServiceService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private protocolService: ProtocolServiceService
  ) {}

  ngOnInit(): void {
    this.getTeams();
    this.getPlayers();
    this.isHome = true;

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ["", Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ["", Validators.required],
    });

    this.protocolForm = new FormGroup({
      refree: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      host: new FormControl(this.allTeams, [Validators.required]),
      guest: new FormControl(null, [Validators.required]),
      matchDate: new FormControl(null, [Validators.required]),
      comment: new FormControl("Brak", [Validators.required]),
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
      hostStricker: new FormControl("", [Validators.required]),
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
      guestStricker: new FormControl("", [Validators.required]),
    });

    this.guestGoalForm = new FormGroup({
      guestScorrer: new FormControl("", [Validators.required]),
      guestAssitant: new FormControl("", [Validators.required]),
      guestGoalMinute: new FormControl("", [
        Validators.required,
        CustomValidator.numeric,
        Validators.max(90),
        Validators.min(1),
      ]),
    });

    this.hostGoalForm = new FormGroup({
      hostScorrer: new FormControl("", [Validators.required]),
      hostAssitant: new FormControl("", [Validators.required]),
      hostGoalMinute: new FormControl("", [
        Validators.required,
        CustomValidator.numeric,
        Validators.max(90),
        Validators.min(1),
      ]),
    });

    this.guestChangeForm = new FormGroup({
      guestPlayer: new FormControl("", [Validators.required]),
      guestNewPlayer: new FormControl("", [Validators.required]),
      guestChangeMinute: new FormControl("", [
        Validators.required,
        CustomValidator.numeric,
        Validators.max(90),
        Validators.min(1),
      ]),
    });

    this.hostChangeForm = new FormGroup({
      hostPlayer: new FormControl("", [Validators.required]),
      hostNewPlayer: new FormControl("", [Validators.required]),
      hostChangeMinute: new FormControl("", [
        Validators.required,
        CustomValidator.numeric,
        Validators.max(90),
        Validators.min(1),
      ]),
    });

    this.hostCardForm = new FormGroup({
      card: new FormControl("", [Validators.required]),
      player: new FormControl("", [Validators.required]),
      minute: new FormControl("", [
        Validators.required,
        CustomValidator.numeric,
        Validators.max(90),
        Validators.min(1),
      ]),
    });

    this.guestCardForm = new FormGroup({
      card: new FormControl("", [Validators.required]),
      player: new FormControl("", [Validators.required]),
      minute: new FormControl("", [
        Validators.required,
        CustomValidator.numeric,
        Validators.max(90),
        Validators.min(1),
      ]),
    });
  }

  getTeams() {
    this.teamService.getTeams().subscribe((teams) => {
      this.allTeams = teams;
    });
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe((players) => {
      this.allPlayers = players;
    });
  }

  postProtocol(protocol: Protocol) {
    this.protocolService.postProtocol(protocol).subscribe(
      (match) => {
        console.log("wysylanie protokolu" + match);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectHost(event) {
    this.aviableTeams = this.allTeams.slice(0);
    const index = this.allTeams.findIndex(
      (i) => i.name === this.protocolForm.value.host
    );

    if (index > -1) {
      this.aviableTeams.splice(index, 1);
    }
  }

  addPlayers() {
    this.hostPlayers = this.allPlayers.filter(
      (player) => player.club === this.protocolForm.value.host
    );

    this.guestPlayers = this.allPlayers.filter(
      (player) => player.club === this.protocolForm.value.guest
    );

    document.getElementById("playersGoalsChange").style.display = "block";
  }

  selectHostGoalkeeper($event) {}

  addHostGoal() {
    const goal: Goal = {
      scorer: this.hostGoalForm.value.hostScorrer,
      assistant: this.hostGoalForm.value.hostAssitant,
      minute: this.hostGoalForm.value.hostGoalMinute,
    };

    //   console.log('dadanp gplla' + goal.assistant + ' ' + goal.scorrer);

    if (this.hostGoals === undefined) {
      this.hostGoals = [goal];
    } else {
      this.hostGoals.push(goal);
    }

    this.guestGoalForm.reset();
    this.hostGoalForm.reset();
  }

  addHostCard() {
    const card: Card = {
      player: this.hostCardForm.value.player,
      minute: this.hostCardForm.value.minute,
      card: this.hostCardForm.value.card,
    };

    if (this.hostCard === undefined) {
      this.hostCard = [card];
    } else {
      this.hostCard.push(card);
    }

    this.hostCardForm.reset();
  }

  addGuestCard() {
    const card: Card = {
      player: this.guestCardForm.value.player,
      minute: this.guestCardForm.value.minute,
      card: this.guestCardForm.value.card,
    };

    // console.log(card);

    if (this.guestCard === undefined) {
      this.guestCard = [card];
    } else {
      this.guestCard.push(card);
    }

    this.guestCardForm.reset();
  }

  addGuestGoal() {
    const goal: Goal = {
      scorer: this.guestGoalForm.value.guestScorrer,
      assistant: this.guestGoalForm.value.guestAssitant,
      minute: this.guestGoalForm.value.guestGoalMinute,
    };

    //  console.log(goal);

    if (this.guestGoals === undefined) {
      this.guestGoals = [goal];
    } else {
      this.guestGoals.push(goal);
    }

    this.guestGoalForm.reset();
    this.hostGoalForm.reset();
  }

  homeOrAway() {
    // tslint:disable-next-line: no-unused-expression
    this.isHome = !this.isHome;
  }

  hostPlayerChange() {
    const change: PlayerChange = {
      oldPlayer: this.hostChangeForm.value.hostPlayer,
      newPlayer: this.hostChangeForm.value.hostNewPlayer,
      minute: this.hostChangeForm.value.hostChangeMinute,
    };

    if (this.hostChange === undefined) {
      this.hostChange = [change];
    } else if (this.hostChange.length < 2) {
      this.hostChange.push(change);
    } else {
      this.hostChange.push(change);
      document.getElementById("hostPlayerChangeButton").style.display = "none";
      document.getElementById("hostPlayerChangeInfo").style.display = "block";
    }
    this.hostChangeForm.reset();
    this.guestChangeForm.reset();
  }

  guestPlayerChange() {
    const change: PlayerChange = {
      oldPlayer: this.guestChangeForm.value.guestPlayer,
      newPlayer: this.guestChangeForm.value.guestNewPlayer,
      minute: this.guestChangeForm.value.guestChangeMinute,
    };

    if (this.guestChange === undefined) {
      this.guestChange = [change];
      //  console.log(this.guestChange);
    } else if (this.guestChange.length < 2) {
      this.guestChange.push(change);
      // console.log(this.guestChange);
    } else {
      this.guestChange.push(change);
      document.getElementById("guestPlayerChangeButton").style.display = "none";
      document.getElementById("guestPlayerChangeInfo").style.display = "block";
      // console.log(this.guestChange);
    }

    this.guestChangeForm.reset();
  }

  createProtocol() {
    const startDate = this.datePipe
      .transform(this.protocolForm.value.matchDate, "yyyy-MM-dd")
      .toString();

    // this.hostPlayers = this.hostPlayersForm.value;
    // this.guestPlayers = this.guestPlayersForm.value;
    /*
    const hostGoal: Goal[] = [{
      scorrer: this.hostGoals[0].scorrer,
      assistant: this.hostGoals[0].assistant,
      minute: this.hostGoals[0].minute
    }]
*/
    const protcol: Protocol = {
      refree: this.protocolForm.value.refree,
      host: this.protocolForm.value.host,
      guest: this.protocolForm.value.guest,
      date: startDate,
      hostCards: this.hostCard,
      guestCards: this.guestCard,
      hostGoals: this.hostGoals,
      guestGoals: this.guestGoals,
      // hostPlayers: this.hostPlayersForm.value,
      // guestPlayers: this.guestPlayersForm.value,
      guestChange: this.guestChange,
      hostChange: this.hostChange,
      comments: this.protocolForm.value.comment,
    };

    // console.log('protokół object: ');
    // console.log(protcol);

    const protocolJSON = JSON.stringify(this.Protocol);

    // console.log('protokół JSON: ');
    // console.log(protocolJSON);

    //  console.log('post protdoloc: ' +  protcol.hostGoals[0].assistant.name);

    console.log("post scorrer: " + protcol.guestGoals[0].scorer.name);

    this.updateTeam();

    this.postProtocol(protcol);

    this.updatePlayer();
  }

  /*
  updateHostPlayer(){
    this.hostGoalForm

    this.playerService.updatePlayer()
  }
*/

  updatePlayer() {
    let id;
    let player;

    if (this.hostGoals !== undefined) {
      for (let i = 0; i < this.hostGoals.length; i++) {
        id = this.hostGoals[i].scorer.id.toString();
        player = this.allPlayers.find((pl) => pl.id === id);
        player.goals = player.goals + 1;
        this.playerService.updatePlayer(player).subscribe((a) => {
          console.log(a);
        });

        id = this.hostGoals[i].assistant.id.toString();
        player = this.allPlayers.find((pl) => pl.id === id);
        player.assists = player.assists + 1;

        this.playerService.updatePlayer(player).subscribe((a) => {
          console.log(a);
        });
      }
    }

    if (this.guestGoals !== undefined) {
      for (let i = 0; i < this.guestGoals.length; i++) {
        id = this.guestGoals[i].scorer.id.toString();
        player = this.allPlayers.find((pl) => pl.id === id);
        player.goals = player.goals + 1;
        this.playerService.updatePlayer(player).subscribe((a) => {
          console.log(a);
        });

        id = this.hostGoals[i].assistant.id.toString();
        player = this.allPlayers.find((pl) => pl.id === id);
        player.assists = player.assists + 1;

        this.playerService.updatePlayer(player).subscribe((a) => {
          console.log(a);
        });
      }
    }

    if (this.hostCard !== undefined) {
      for (let i = 0; i < this.hostCard.length; i++) {
        id = this.hostCard[i].player.id.toString();
        player = this.allPlayers.find((pl) => pl.id === id);
        if (this.hostCard[i].card.toString() === "żólta") {
          player.yellowCards = player.yellowCards + 1;
          console.log("JEST żółta!!");
        } else {
          player.redCards = player.redCards + 1;
        }

        this.playerService.updatePlayer(player).subscribe((a) => {
          console.log(a);
        });
      }
    }

    if (this.guestCard !== undefined) {
      for (let i = 0; i < this.hostCard.length; i++) {
        id = this.hostCard[i].player.id.toString();
        player = this.allPlayers.find((pl) => pl.id === id);
        if (this.hostCard[i].card.toString() === "żólta") {
          player.yellowCards = player.yellowCards + 1;
          console.log("JEST żółta!!");
        } else {
          player.redCards = player.redCards + 1;
        }

        this.playerService.updatePlayer(player).subscribe((a) => {
          console.log(a);
        });
      }
    }
  }

  updateTeam() {
    // tslint:disable-next-line:no-unused-expression

    const host = this.allTeams.find(
      (team) => team.name === this.protocolForm.value.host
    );
    const guest = this.allTeams.find(
      (team) => team.name === this.protocolForm.value.guest
    );

    var hostGoals;
    var guestGoals;
    if (this.hostGoals === undefined) {
      hostGoals = 0;
    } else {
      hostGoals = this.hostGoals.length;
    }

    if (this.guestGoals === undefined) {
      guestGoals = 0;
    } else {
      guestGoals = this.guestGoals.length;
    }

    if (hostGoals === guestGoals) {
      host.draw = host.draw + 1;
      guest.draw = guest.draw + 1;
    } else if (hostGoals < guestGoals) {
      host.lose = host.lose + 1;
      guest.win = guest.win + 1;
    } else if (hostGoals > guestGoals) {
      host.win = host.win + 1;
      guest.lose = guest.lose + 1;
    }

    host.goalsScored = host.goalsScored + hostGoals;
    guest.goalsScored = guest.goalsScored + guestGoals;

    this.teamService.updateTeam(guest).subscribe((a) => {
      console.log(a);
    });
    this.teamService.updateTeam(host).subscribe((a) => {
      console.log(a);
    });
  }
}

export class CustomValidator {
  static numeric(control: AbstractControl) {
    const val = control.value;

    if (val === null || val === "") {
      return null;
    }

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
      return { invalidNumber: true };
    }

    return null;
  }
}
