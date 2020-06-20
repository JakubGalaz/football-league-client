import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Team } from "./Team";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: "root"
})
export class TeamServiceService {
  constructor(private http: HttpClient) {}

  getTeams(): Observable<Array<Team>> {
    return this.http.get<Array<Team>>("http://localhost:8081/teams");
  }

  postTeam(team: Team): Observable<Team> {
    return this.http.post("http://localhost:8081/saveTeam", team);
  }

  deleteTeamById(id: string): Observable<Team> {
    return this.http.delete("http://localhost:8081/delete/" + id);
  }

  getTeamById(id: string): Observable<Team> {
    return this.http.get("http://localhost:8081/showTeamById/" + id);
  }

  updateTeam(team: Team): Observable<Team>{
    return this.http.put("http://localhost:8081/updateTeam", team);
  }
}
