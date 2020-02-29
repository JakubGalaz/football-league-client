import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Player } from "../Player";

interface Position {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-add-player",
  templateUrl: "./add-player.component.html",
  styleUrls: ["./add-player.component.css"]
})
export class AddPlayerComponent implements OnInit {
  playerForm: FormGroup;

  message = new Player();

  foods: Position[] = [
    { value: "Goalkeeper", viewValue: "Bramkarz" },
    { value: "Defender", viewValue: "Obrońca" },
    { value: "Stricker", viewValue: "Napastnik" },
    { value: "Midfielder", viewValue: "Pomocnik" }
  ];

  constructor() {}

  ngOnInit(): void {
    this.playerForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      surname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      age: new FormControl(null, [
        Validators.required,
        CustomValidator.numeric,
        Validators.minLength(1),
        Validators.maxLength(2)
      ]),
      club: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),

      position: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.playerForm.value.name);

    this.message.name = this.playerForm.value.name;
    this.message.age = this.playerForm.value.age;
    this.message.position = this.playerForm.value.position;
    this.message.surname = this.playerForm.value.surname;
    this.message.club = this.playerForm.value.club;

    console.log(this.message);
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
