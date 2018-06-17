import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ISelection } from './model/selection';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SelectionService {

  constructor(private http: HttpClient) { }

  getAllSelection(url: string): Observable<ISelection[]>{
    return this.http.get<ISelection[]>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  addSelection(url: string, selection: ISelection): Observable<any> {  
    return this.http.post(url, JSON.stringify(selection), httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateSelection(url: string, id: number, selection: ISelection): Observable<any> {
    const newurl = `${url}?id=${id}`;
    return this.http.put(newurl, selection, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteSelection(url: string, id: number): Observable<any> {
    const newurl = `${url}?id=${id}`;
    return this.http.delete(newurl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // custom handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
