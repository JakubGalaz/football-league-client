import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddPlayerComponent } from "./add-player/add-player.component";
import { AddTeamComponent } from "./add-team/add-team.component";
import { AddProtocolComponent } from "./add-protocol/add-protocol.component";
import { DeleteTeamComponent } from "./delete-team/delete-team.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
