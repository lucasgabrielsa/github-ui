import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  //connect module to work with http
  constructor(private http: HttpClient) { }

  /** 
  * Method for request de user
  * @param The name of the user
  * @returns a User entity
  */
  getUser(name: string): Observable<User> {
    const url = `https://api.github.com/users/${name}`;
    return this.http.get<User>(url);
  }
}
