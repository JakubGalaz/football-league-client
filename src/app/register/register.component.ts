import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  tmp: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
          ),
        ])
      ),
      password: new FormControl(
        null,
        Validators.compose([
          Validators.minLength(6),
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
    });
  }
  signup() {
    this.authService.signup(
      this.registerForm.value.email,
      this.registerForm.value.password
    );
  }
  onSubmit() {}
}
