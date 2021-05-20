import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { H } from '@angular/cdk/keycodes';

const API_URL = 'http://localhost:8080/api/user/';
const USER_ID : string = 'userId';
const USER_ROLE : string = 'user_role'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(budget_year:string): Observable<any> {
    return this.http.post(API_URL + 'all',{budget_year});
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

  check(id:number):Observable<any>{
    return this.http.post(API_URL + 'check',{id})
  }

  resetPass(id:number) : Observable<any>{
    return this.http.post(API_URL + "reset",{id})
  }

  getUser(username:string): Observable<any> {
    return this.http.post(API_URL + 'finduser', {username});
  }
  getUserId(id:number,budget_year:string): Observable<any> {
    return this.http.post(API_URL + 'findid', {id,budget_year});
  }

  getallBudget(budget_year:string): Observable<any> {
    return this.http.post(API_URL + 'allbudget', {budget_year});
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

    getBudgetUser(userId:number,budget_year:string):Observable<any>{
      return this.http.post(API_URL + 'budget',{userId,budget_year})
    }

    insertBudget(userId:number,budget_year:string,budget:number):Observable<any>{
      return this.http.post(API_URL + 'budgetInsert',{userId,budget_year,budget})
    }


}

export interface DialogData {
  id : number;
  username: string;
  fullname: string;
  budget: number;
  price: number;
  classes: string;
  keys: string;
  keytwo: string;
  status:boolean;
}
