import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Globals } from '../globals';
import { catchError } from 'rxjs/operators';
import {Posts} from "./posts";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})



export class MyPostsService {
  constructor(private http: HttpClient) { }

  sendPostToServer(posts: Posts): Observable<void>  {
    return this.http.post<void>(Globals.baseURL + '/posts/',posts,httpOptions);
  }

  getMyPosts(): Observable<Posts[]>{
    return this.http.get<Posts[]>(Globals.baseURL + '/my-posts/',httpOptions)
  }

  getAllPosts(): Observable<Posts[]>{
    return this.http.get<Posts[]>(Globals.baseURL + '/all-posts/',httpOptions)
  }

}
