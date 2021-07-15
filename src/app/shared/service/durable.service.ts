import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { H } from '@angular/cdk/keycodes';

const API_URL = 'http://localhost:8080/api/durable/';


@Injectable({
  providedIn: 'root'
})
export class DurableService {

  constructor(private http: HttpClient) { }

  getDuCate():Observable<any>{
    return this.http.get(API_URL + 'ducate');
  }

  getAllDurable(): Observable<any>{
    return this.http.get(API_URL + 'listAll')
  }
  getUserDurable(id:number): Observable<any>{
    return this.http.post(API_URL + 'userlist',{id});
  }

  create(du_name:string,du_status:string,du_serial:string,du_price:number,date:Date,get:string,ducateId:number): Observable<any>{
    return this.http.post(API_URL + 'insert',{du_name,du_status,du_serial,du_price,date,get,ducateId})
  }

  deleteDurable(id:number) :Observable<any>{
    return this.http.post(API_URL + 'delete',{id})
  }

  update(id:number,du_name:string,du_status:string,du_serial:string,du_price:number,get:string): Observable<any>{
    return this.http.post(API_URL + 'update',{id,du_name,du_status,du_serial,du_price,get})
  }


  filter(filter:string) :Observable<any>{
    return this.http.post(API_URL + 'fillter',{filter})
  }

  updateOwnerNull(id:number,userId:number| null,claId:number|null): Observable<any> {
    return this.http.post(API_URL + 'update',{id,userId,claId});
  }
  reportDurable(){
    return window.open('http://localhost:8080/api/report/durablelist');
  }

}

export interface Item {
  id: number | string;
  du_name: string;
  du_status: number;
  du_price: number;
  du_serial: number;
  unit_name: string;
  userId:number;
  get:string;
}
