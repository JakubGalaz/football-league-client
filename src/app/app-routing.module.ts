import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddPlayerComponent } from "./add-player/add-player.component";
import { AddTeamComponent } from "./add-team/add-team.component";
import { AddProtocolComponent } from "./add-protocol/add-protocol.component";
import { DeleteTeamComponent } from "./delete-team/delete-team.component";
import { DeleteSuccessComponent } from "./delete-success/delete-success.component";

import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {DeletePlayerComponent} from "./delete-player/delete-player.component";
import {DeleteProtocolComponent} from "./delete-protocol/delete-protocol.component";
import {PlayerComponent} from "./player/player.component";


const routes: Routes = [
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
