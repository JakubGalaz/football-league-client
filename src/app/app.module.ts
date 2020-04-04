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
import { DeleteSuccessComponent } from './delete-team/delete-success/delete-success.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MatSortModule} from '@angular/material/sort';
import { DeleteProtocolComponent } from './delete-protocol/delete-protocol.component';
import {ProtocolServiceService} from "./protocol-service.service";
import { PlayerComponent } from './player/player.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import { AddPlayerSuccessComponent } from './add-player/add-player-success/add-player-success.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import { DatePipe } from "@angular/common";
import {TextFieldModule} from '@angular/cdk/text-field';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from "./auth.service";




const firebaseConfig = {
  apiKey: "AIzaSyAdmAFdkEa4b3OsOXn9bGE_FBjmL2TJGoI",
  authDomain: "football-league-65af2.firebaseapp.com",
  databaseURL: "https://football-league-65af2.firebaseio.com",
  projectId: "football-league-65af2",
  storageBucket: "football-league-65af2.appspot.com",
  messagingSenderId: "6310011462",
  appId: "1:6310011462:web:7e30edb19a8d6f0f03a047"
};


@NgModule({
  declarations: [
    AppComponent,
    AddPlayerComponent,
    AddTeamComponent,
    AddProtocolComponent,
    DeletePlayerComponent,
    DeleteTeamComponent,
    DeleteSuccessComponent,
    WelcomePageComponent,
    DeleteProtocolComponent,
    PlayerComponent,
    AddPlayerSuccessComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent
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
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    TextFieldModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule


  ],
  providers: [PlayerServiceService, TeamServiceService, ProtocolServiceService, DatePipe, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
