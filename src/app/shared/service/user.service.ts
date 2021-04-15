import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/user/';
const USER_ID : string = 'userId';
const USER_ROLE : string = 'user_role'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }

  getUser(username:string): Observable<any> {
    return this.http.post(API_URL + 'finduser', {username});
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  saveUser(id:string){
    window.sessionStorage.removeItem(USER_ID)
    window.sessionStorage.setItem(USER_ID,id)
  }

  setRole(role: string){
    window.sessionStorage.removeItem(USER_ROLE)
    window.sessionStorage.setItem(USER_ROLE,role)
  }

  getRole(){
    return window.sessionStorage.getItem(USER_ROLE)
  }

  getId(): string | null{
    return window.sessionStorage.getItem(USER_ID)
  }

}
