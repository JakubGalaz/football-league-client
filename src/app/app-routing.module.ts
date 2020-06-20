import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddPlayerComponent } from "./add-player/add-player.component";
import { AddTeamComponent } from "./add-team/add-team.component";
import { AddProtocolComponent } from "./add-protocol/add-protocol.component";
import { DeleteTeamComponent } from "./delete-team/delete-team.component";
import { DeleteSuccessComponent } from "./delete-team/delete-success/delete-success.component";

import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {DeletePlayerComponent} from "./delete-player/delete-player.component";
import {DeleteProtocolComponent} from "./delete-protocol/delete-protocol.component";
import {PlayerComponent} from "./player/player.component";
import {AddPlayerSuccessComponent} from "./add-player/add-player-success/add-player-success.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {BestScorrersComponent} from "./best-scorrers/best-scorrers.component";
import {BestAssistantsComponent} from "./best-assistants/best-assistants.component";
import {TeamComponent} from "./team/team.component";
import {TableComponent} from "./table/table.component";
import {MyPositionsComponent} from "./my-positions/my-positions.component";
import {AuthGuardService} from "./auth-guard.service";


const routes: Routes = [
  { path: "",
    redirectTo: "/welcomePage",
    pathMatch: "full"
  },

  {
    path: "addPlayer",
    component: AddPlayerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "addTeam",
    component: AddTeamComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "addProtocol",
    component: AddProtocolComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "deleteTeam",
    component: DeleteTeamComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "deleteTeam/success",
    component: DeleteSuccessComponent
  },
  {
    path: "welcomePage",
    component: WelcomePageComponent
  },
  {
    path: "deletePlayer",
    component: DeletePlayerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "deleteProtocol",
    component: DeleteProtocolComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "bestScorrer",
    component: BestScorrersComponent
  },
  {
    path: "bestAssistants",
    component: BestAssistantsComponent
  },
  {
    path: "team/:id",
    component: TeamComponent
  },
  {
    path: "player/:id",
    component: PlayerComponent
  },
  {
    path: "addPlayer/success",
    component: AddPlayerSuccessComponent
  },
  {
    path: "table",
    component: TableComponent
  },
  {
    path: "myPositions",
    component: MyPositionsComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
