import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "football-league";
  visable = "hidden";
  email: boolean;

  constructor(public authService: AuthService) {
    this.email = true;
  }

  ngOnInit(): void {
    if (this.authService.user.email !== undefined) {
      if (this.authService.user.email.toString() === "admin@admin@pl") {
        console.log("moj email to admin");
        this.email = false;
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}
