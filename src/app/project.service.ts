import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IProject } from './model/project';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) { }

  getAllProjectNames(url:string): Observable<string[]>{
    return this.http.get<string[]>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  getAllProject(url: string): Observable<IProject[]>{
    return this.http.get<IProject[]>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  addProject(url: string, project: IProject): Observable<any> {    
    return this.http.post(url, JSON.stringify(project), httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // update project details
  updateProject(url: string, id: number, project: IProject): Observable<any> {
    const newurl = `${url}?id=${id}`;
    return this.http.put(newurl, project, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // delete project information
  deleteProject(url: string, id: number): Observable<any> {
    const newurl = `${url}?id=${id}`; // DELETE api/project?id=42
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
