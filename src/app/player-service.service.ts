import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Player } from "./Player";
import { Observable } from "rxjs/Observable";
import {strict} from "assert";

@Injectable({
  providedIn: "root"
})


export class PlayerServiceService {
  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Array<Player>> {
    return this.http.get<Array<Player>>('http://localhost:8081/players');
  }

  postPlayer(player: Player): Observable<Player> {
    return this.http.post('http://localhost:8081/savePlayer', player);
  }

  deletePlayerById(id: string): Observable<Player>
  {
    return this.http.delete('http://localhost:8081/deletePlayerById/' + id);
  }

  findPlayerById(id: string): Observable<Player>{
    return this.http.get('http://localhost:8081/showPlayerById/' + id);
  }

  updatePlayer(player: Player): Observable<Player>{
    return this.http.put('http://localhost:8081/updatePlayer/', player);
  }
}
