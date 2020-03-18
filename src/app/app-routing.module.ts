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


const routes: Routes = [
  { path: "",
    redirectTo: "/welcomePage",
    pathMatch: "full"
  },

  {
    path: "addPlayer",
    component: AddPlayerComponent
  },
  {
    path: "addTeam",
    component: AddTeamComponent
  },
  {
    path: "addProtocol",
    component: AddProtocolComponent
  },
  {
    path: "deleteTeam",
    component: DeleteTeamComponent
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
    component: DeletePlayerComponent
  },
  {
    path: "deleteProtocol",
    component: DeleteProtocolComponent
  },
  {
    path: "player",
    component: PlayerComponent
  },
  {
    path: "addPlayer/success",
    component: AddPlayerSuccessComponent
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
