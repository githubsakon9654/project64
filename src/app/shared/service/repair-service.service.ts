import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'http://localhost:8080/api/repair/'

@Injectable({
  providedIn: 'root'
})
export class RepairServiceService {

  constructor(private http: HttpClient) { }

  getListRepair(duId:number): Observable<any>{
    return this.http.post(API_URL + 'list',{duId});
  }

  insertRepair(name:string,detail:string,price:number,duId:number):Observable<any>{
    return this.http.post(API_URL + 'insert',{name,detail,price,duId});
  }
}
