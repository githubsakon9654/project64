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

  deleteUser(id:number): Observable<any>{
    return this.http.post(API_URL + 'delete',{id})
  }

  updateUserPrice(id:number,price:number): Observable<any>{
    return this.http.post(API_URL + 'update',{id,price})
  }

  updateUserByAdmin(id:number,username:string,classes:string, price:number,fullname:string): Observable<any>{
    return this.http.post(API_URL + 'update',{id,username,fullname,classes,price})
  }

  changePass(id:number,password:string,newpassword:string): Observable<any>{
    return this.http.post(API_URL + 'repass',{id,password,newpassword})
  }

  resetPass(id:number) : Observable<any>{
    return this.http.post(API_URL + "reset",{id})
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

  setUsername(username: string){
    window.sessionStorage.removeItem('username')
    window.sessionStorage.setItem('username',username)
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

    getUsername(): string | null{
      return window.sessionStorage.getItem('username')
    }



}

export interface DialogData {
  id : number;
  username: string;
  fullname: string;
  price: number;
  classes: string;
  keys: string;
  keytwo: string;
  status:boolean;
}
