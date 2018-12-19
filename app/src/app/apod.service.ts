import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApodData } from "./shared/ApodData";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApodService {
  url = "http://localhost:3000"

  constructor(private http: HttpClient) { }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getToday() {
    return this.getDay(0);
  }

  getDay(date: number | Date, base?: Date) {
    if (typeof date === "number")
    {
      if(!base){base = new Date();}

      date = new Date(base.valueOf() - date * 864e5);
    }
    //console.log(date);
    let dateString = `${
      date.getFullYear()
    }-${
      (date.getMonth() + 1).toString(10).padStart(2, '0')
    }-${
      date.getDate().toString(10).padStart(2, '0')
    }`;
    //console.log(dateString);

    return this.http.get<ApodData>(this.url, {
      params: {
        "date": dateString
      }
    }).pipe(
      //tap(_ => console.log(`Fetched apod for ${dateString}`)),
      catchError(this.handleError<ApodData>(`getToday date=${dateString}`))
    );
  }
}
