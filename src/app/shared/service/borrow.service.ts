import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'http://localhost:8080/api/borrow/'

export interface Item {
  id: number | string;
  du_name: string;
  du_status: number;
  du_serial: number;
  unit_name: string;
  key:string;
}

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient) {}
  private item: Array<Item> = []

  source$: BehaviorSubject<Array<Item>> = new BehaviorSubject<Array<Item>>(this.item)


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

  getBorrowList(): Observable<any>{
    return this.http.get(API_URL + 'listall');
  }

  getBorrowUserList(userId:number) :Observable<any>{
    return this.http.post(API_URL + 'listuser',{userId});
  }

  insertBorrow(userId:number,borrow_name:string,durable:Array<any>):Observable<any>{
    return this.http.post(API_URL + 'insert',{userId,borrow_name,durable});
  }

  detailBorrow(id:number) :Observable<any> {
    return this.http.post(API_URL + 'detail',{id})
  }

  updateApprove(id:number,admin_approve:boolean,dire_approvev:boolean,durable:Array<any>): Observable<any> {
    return this.http.post(API_URL + 'updateAppove',{id,admin_approve,dire_approvev,durable});
  }

}
