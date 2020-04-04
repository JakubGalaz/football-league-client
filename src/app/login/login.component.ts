import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({

      email: new FormControl(null, Validators.compose(
        [Validators.required,
          Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])),
      password: new FormControl(null, Validators.compose(
        [Validators.minLength(5), Validators.required, Validators.maxLength(20)])),

    });

  }

  login(){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  onSubmit(){

  }
}
