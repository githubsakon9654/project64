import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'http://localhost:8080/api/offer/'

export interface Item {
  id: number | string;
  supplie_name: string;
  unit: number;
  price: number;
  unit_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) {this.calculatorTotal(); }
  private item: Array<Item> = []

  menu$: Subject<Object> = new Subject<Object>();
  user$: Subject<String> = new Subject<String>();
  source$: BehaviorSubject<Array<Item>> = new BehaviorSubject<Array<Item>>(this.item)
  total$: BehaviorSubject<Number> = new BehaviorSubject<Number>(0)

  set_offer(appove:boolean) : Observable<any>{
    return this.http.post(API_URL + 'appove',{appove:appove})
  }

  get_offer(): Observable<any>{
    return this.http.get(API_URL + 'getappove')
  }

  get_unit_offer(): Observable<any>{
    return this.http.get(API_URL + 'listUnit');
  }
  get_clear_all(): Observable<any>{
    return this.http.get(API_URL + 'clear');
  }

  get_list_offer() :Observable<any>{
    return this.http.get(API_URL + 'listAll')
  }

  get_detail(id:number): Observable<any>{
    return this.http.post(API_URL + 'detail',{id})
  }

  update_offer_app(id:number,offer_status:boolean): Observable<any>{
    return this.http.post(API_URL + 'update',{id,offer_status})
  }
  clear(){
    let t = this.item = []
    this.source$.next(t)
  }


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

  filter(filter: string): Observable<any>{
      return this.http.post('http://localhost:8080/api/supplie/filter', {
          filter
      });
  }

  report(){
    return window.open('http://localhost:8080/api/report/offerlist')
  }

  calculatorTotal(): Number {
    let t = this.item.reduce((previoueValue, currentValue) => +previoueValue + +currentValue.price * +currentValue.unit, 0)
    this.total$.next(t)
    return t
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

  insertOffer(userId:number,offer_name:string,supplie:Array<any>,units:Array<any>): Observable<any>{
    return this.http.post(API_URL + 'insert', {userId,offer_name,supplie,units});
  }

}
