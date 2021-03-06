import { Injectable} from '@angular/core';
import { BehaviorSubject, Subject, Observable, EMPTY} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

const API_URL = 'http://localhost:8080/api/reveal/';
@Injectable({
    providedIn: 'root'
})

export class RevealService {

    constructor(private http: HttpClient){
      this.calculatorTotal();
    }

    private item: Array<Item> = []

    menu$: Subject<Object> = new Subject<Object>();
    user$: Subject<String> = new Subject<String>();
    source$: BehaviorSubject<Array<Item>> = new BehaviorSubject<Array<Item>>(this.item)
    total$: BehaviorSubject<Number> = new BehaviorSubject<Number>(0)


  pushService(item: Item) {
        let x = false
        let y = this.item.map(n => {
          if(n.id == item.id){
            n.unit = n.unit + 1
            x = true
          }
          return n
        })
        if (!x) {
          this.item = [...y, item]
        }
        this.source$.next(this.item)
        this.calculatorTotal()
  }

  calculatorTotal(): Number {
      let t = this.item.reduce((previoueValue, currentValue) => +previoueValue + +currentValue.price * +currentValue.unit, 0)
      this.total$.next(t)
      return t
  }

  clear(){
    let t = this.item = []
    this.source$.next(t)
  }

  ca(): Number {
      let t = this.item.reduce((previoueValue, currentValue) => +previoueValue + +currentValue.unit, 0)
      return t
  }

  addService(id: String | Number) {

    let x = this.item.map(n => {
        if(n.id == id){
            n.unit = n.unit + 1
        }
        return n
    })
    this.source$.next(this.item)
    this.calculatorTotal()
  }

  removeServices(items: Array<Item>) {
    items.forEach(n => {
        this.item = this.item.filter(v => v.id != n.id)
    })
    this.source$.next(this.item)
    this.calculatorTotal()
  }
  removeService(id: String | Number) {
    let y = false
      let x = this.item.map(n => {
          if(n.id == id){
            n.unit = n.unit -1
            if(n.unit <= 0){
              // y = true
              this.item = this.item.filter(v => v.id != id)
            }
          }
          // return n
      })
      // if (!y) {
      //     this.item = this.item.filter(v => v.id != id)
      // }
      this.source$.next(this.item)
      this.calculatorTotal()
  }

  insertReveal(userId:number,total_price:number,supplie:Array<any>,units:Array<any>,year:string): Observable<any>{
    return this.http.post(API_URL + 'insert', {userId,total_price,supplie,units,year});
  }

  getRevealList(): Observable<any>{
    return this.http.get(API_URL + 'listAll');
  }
  updateRemain(id:number,supplieId:number,remain:number):Observable<any>{
    return this.http.post(API_URL + 'upRemain',{id,supplieId,remain})
  }

  getUnit(id:number,supplieId:number):Observable<any>{
    return this.http.post(API_URL + 'getUnit',{id,supplieId})
  }

  getRevealUserList(userId:number): Observable<any> {
    return this.http.post(API_URL + 'listByUser', {userId});
  }

  getDAteList(start:string,end:string): Observable<any> {
    return this.http.post(API_URL + 'filldate', {start,end});
  }

  getRevealDetail(id:number): Observable<any>{
    return this.http.post(API_URL + 'detail',{id});
  }

  updateApprove(id:number,admin_approve:boolean): Observable<any> {
    return this.http.post(API_URL + 'updateAppove',{id,admin_approve});
  }

  updateAccept(id:number,accept:boolean): Observable<any> {
    return this.http.post(API_URL + 'updateAppove',{id,accept});
  };


  reportByUser(id:number){
    return window.open('http://localhost:8080/api/report/revealuser/' + id)
  }
  reportDetail(id:number){
    return window.open('http://localhost:8080/api/report/revealdetail/' + id)
  }
  reportList(){
    return window.open('http://localhost:8080/api/report/reveallist')
  }


}

export interface Item {
    id: number | string;
    supplie_name: string;
    unit: number;
    price: number;
    unit_name: string;
}
