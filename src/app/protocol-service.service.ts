import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Protocol} from "./Protocol";

@Injectable({
  providedIn: 'root'
})
export class ProtocolServiceService {


  constructor(private http: HttpClient) { }

  getProtocols(): Observable<Array<Protocol>>{
    return this.http.get<Array<Protocol>>("http://localhost:8081/protocols")
  }

  postProtocol(protocol: Protocol): Observable<Protocol>{
    return this.http.post("http://localhost:8081/protocols", protocol);
  }


  getProtocolById(id: string): Observable<Protocol>{
    return  this.http.get<Protocol>("http://localhost:8081/getProtcolById");
  }

  deleteProtocolById(id: string): Observable<Protocol>{
    return  this.http.delete("http://localhost:8081/deleteProtcolById");
  }




}
