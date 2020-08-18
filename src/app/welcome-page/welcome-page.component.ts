import { Component, OnInit } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.css"],
})
export class WelcomePageComponent implements OnInit {
  images = [
    "../../assets/welcome1.jpg",
    "../../assets/welcome2.jpg",
    "../../assets/welcome3.jpg",
  ];

  constructor() {}

  ngOnInit(): void {}
}
