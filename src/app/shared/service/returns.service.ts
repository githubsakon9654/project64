import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'http://localhost:8080/api/return/'

export interface Item {
  id: number | string;
  du_name: string;
  du_status: number;
  du_serial: number;
  unit_name: string;
  key:string;
  userId:number;
}

@Injectable({
  providedIn: 'root'
})
export class ReturnsService {

  constructor(private http: HttpClient) { }
  private item: Array<Item> = []

  source$: BehaviorSubject<Array<Item>> = new BehaviorSubject<Array<Item>>(this.item)

  getDAteList(start:string,end:string): Observable<any> {
    return this.http.post(API_URL + 'filldate', {start,end});
  }

  pushService(item: Item) {
    let x = false
    let y = this.item.map(n => {
      if(n.id == item.id){
        x = true
      }
      return n
    })
    if (!x) {
      this.item = [...y, item]
    }
    this.source$.next(this.item)
  }

  clear(){
    let t = this.item = []
    this.source$.next(t)
  }

  removeServices(items: Array<Item>) {
  items.forEach(n => {
      this.item = this.item.filter(v => v.id != n.id)
  })
  this.source$.next(this.item)

  }

  getAllList(): Observable<any>{
    return this.http.get(API_URL + 'list');
  }

  getUserList(userId:number): Observable<any>{
    return this.http.post(API_URL + 'userlist',{userId})
  }

  filter(userId:number,filter:string): Observable<any>{
    return this.http.post(API_URL + 'fillter',{userId,filter})
  }

  insertReturn(userId:number,re_name:string,durable:Array<any>):Observable<any>{
    return this.http.post(API_URL + 'insertreturn',{userId,re_name,durable});
  }

  getDetail(id:number) : Observable<any>{
    return this.http.post(API_URL + 'detail',{id})
  }

  updateStatus(status:boolean,id:number) :Observable<any>{
    return this.http.post(API_URL + 'update',{status,id});
  }

  reportReturn(id:number){
    return window.open('http://localhost:8080/api/report/return/' + id)
  }
  reportAll(){
    return window.open('http://localhost:8080/api/report/returnAll')
  }

  reportDetail(id:number,id2:number){
    return window.open('http://localhost:8080/api/report/returnDetail/' + id + '/' + id2)
  }
}
