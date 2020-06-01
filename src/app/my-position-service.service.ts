import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {FavouritePosition} from './FavouritePosition';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MyPositionServiceService {



  constructor(private  http: HttpClient) { }

  getPositions(): Observable<Array<FavouritePosition>> {
    return this.http.get<Array<FavouritePosition>>('http://localhost:8081/favouritePositions');
  }

  postPosition(favouritePosition: FavouritePosition): Observable<FavouritePosition> {
    console.log('Save efavourite position');
    return  this.http.post('http://localhost:8081/saveFavouritePosition', favouritePosition);


  }

  deletePositionById(id: string) {
    this.http.delete('deleteFavouritePosiotion/' + id);
  }
}
