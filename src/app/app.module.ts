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
import { AddTeamComponent } from "./add-team/add-team.component";
import { AddProtocolComponent } from "./add-protocol/add-protocol.component";
import { TeamServiceService } from "./team-service.service";
import { MatChipsModule } from "@angular/material/chips";
import { DeletePlayerComponent } from "./delete-player/delete-player.component";
import { DeleteTeamComponent } from "./delete-team/delete-team.component";
import { MatTableModule } from "@angular/material/table";
import { DeleteSuccessComponent } from './delete-success/delete-success.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    AddPlayerComponent,
    AddTeamComponent,
    AddProtocolComponent,
    DeletePlayerComponent,
    DeleteTeamComponent,
    DeleteSuccessComponent,
    WelcomePageComponent
  ],
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
    HttpClientModule,
    MatChipsModule,
    MatTableModule,
    NgbModule,
    MatSortModule
  ],
  providers: [PlayerServiceService, TeamServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
