import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player } from "./Player";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: "root"
})
export class PlayerServiceService {
  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Array<Player>> {
    return this.http.get<Array<Player>>("http://localhost:8081/players");
  }

  postPlayer(player: Player): Observable<Player> {
    console.log(player);
    return this.http.post("http://localhost:8081/savePlayer", player);
  }
}
