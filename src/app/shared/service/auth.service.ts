import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, fullname: string, password: string,price:number,classes:string,role:string): Observable<any> {
    const roles = [role]
    console.log(roles)
    return this.http.post(AUTH_API + 'signup', {
      username,
      fullname,
      password,
      price,
      classes,
      roles
    }, httpOptions);
  }

}
