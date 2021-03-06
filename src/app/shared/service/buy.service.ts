import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = 'http://localhost:8080/api/buy/'

export interface Item {
  id: number | string;
  supplie_name: string;
  unit: number;
  price: number;
  unit_name: string;
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

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http: HttpClient) { this.calculatorTotal();}

  private item: Array<Item> = []

  menu$: Subject<Object> = new Subject<Object>();
  user$: Subject<String> = new Subject<String>();
  source$: BehaviorSubject<Array<Item>> = new BehaviorSubject<Array<Item>>(this.item)
  total$: BehaviorSubject<Number> = new BehaviorSubject<Number>(0)

  getBuyList(): Observable<any>{
    return this.http.get(API_URL + 'listAll');
  }

  getDetail(id:number): Observable<any>{
    return this.http.post(API_URL + 'byid',{id});
  }
  globalUpdate(check1:boolean,check2:boolean,check3:boolean,id:number):Observable<any>{
    return this.http.post(API_URL + 'gloupdate',{check1,check2,check3,id});
  }

  getFilldate(start:string,end:string):Observable<any>{
    return this.http.post(API_URL + 'filldate',{start,end});
  }
  setRamain(supplieId:number,unit:number,year:string,id:number):Observable<any>{
    return this.http.post(API_URL + 'remain',{supplieId,unit,year,id});
  }

  setBuyStatus(id:number,status:boolean,year:string) : Observable<any>{
    return this.http.post(API_URL + 'update',{id,status,year})
  }
  setBuyRepel(id:number,repel:boolean) : Observable<any>{
    return this.http.post(API_URL + 'update',{id,repel})
  }
  updateBuy(id:number,userId2:number,userId3:number,userId4:number) : Observable<any>{
    return this.http.post(API_URL + 'update2',{id,userId2,userId3,userId4})
  }
  setAccept(id:number,year:string) : Observable<any>{
    return this.http.post(API_URL + 'accept',{id,year});
  }
  setComment(id:number,store:string) :Observable<any>{
    return this.http.post(API_URL + 'update2',{id,store})
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
        },httpOptions);
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

  reportbuyform(id:number){
    return window.open('http://localhost:8080/api/report/buyform/' + id)
  }
  reportbuyformByStore(id:number,id2:number){
    return window.open('http://localhost:8080/api/report/buyformbystore/' + id + '/'+ id2)
  }

  reportBuylist(){
    return window.open('http://localhost:8080/api/report/buylist')
  }

}


