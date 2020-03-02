import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatMenuModule } from "@angular/material/menu";
import { AlertModule } from "ngx-bootstrap";
import { AddPlayerComponent } from "./add-player/add-player.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { from } from "rxjs";
import { MatSelectModule } from "@angular/material/select";
import { HttpClientModule } from "@angular/common/http";
import { PlayerServiceService } from "./player-service.service";
import { AddTeamComponent } from './add-team/add-team.component';
import { AddProtocolComponent } from './add-protocol/add-protocol.component';

@NgModule({
  declarations: [AppComponent, AddPlayerComponent, AddTeamComponent, AddProtocolComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatMenuModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [PlayerServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
