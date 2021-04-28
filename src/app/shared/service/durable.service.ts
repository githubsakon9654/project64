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

  getAllDurable(): Observable<any>{
    return this.http.get(API_URL + 'listAll')
  }
  getUserDurable(id:number): Observable<any>{
    return this.http.post(API_URL + 'userlist',{id});
  }

  create(du_name:string,du_status:string,du_serial:string): Observable<any>{
    return this.http.post(API_URL + 'insert',{du_name,du_status,du_serial})
  }

  deleteDurable(id:number) :Observable<any>{
    return this.http.post(API_URL + 'delete',{id})
  }

  update(id:number,du_name:string,du_status:string,du_serial:string): Observable<any>{
    return this.http.post(API_URL + 'update',{id,du_name,du_status,du_serial})
  }

  filter(filter:string) :Observable<any>{
    return this.http.post(API_URL + 'fillter',{filter})
  }

  updateOwnerNull(id:number,userId:number| null): Observable<any> {
    return this.http.post(API_URL + 'update',{id,userId});
  }

}

export interface Item {
  id: number | string;
  du_name: string;
  du_status: number;
  du_serial: number;
  unit_name: string;
  userId:number;
}
