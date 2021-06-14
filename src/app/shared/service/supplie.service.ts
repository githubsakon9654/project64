import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/supplie/';

@Injectable({
  providedIn: 'root'
})
export class SupplieService {

  constructor(private http: HttpClient) { }

  createSupplie(supplie_name: string, price:number, unit_name:string,storeId:number,year:string): Observable<any> {
    return this.http.post(API_URL + 'insert',{supplie_name,price, unit_name,storeId,year});
  }

  getStore():Observable<any>{
    return this.http.get(API_URL + 'store')
  }

  getAllSup(year:string): Observable<any> {
    return this.http.post(API_URL + 'listall',{year});
  }

  deleteSupplie(supplieId:number,year:string): Observable<any>{
    return this.http.post(API_URL + 'deleteunit',{supplieId,year})
  }

  updateSupplie(id:number,supplie_name: string, price:number, unit_name:string): Observable<any> {
    return this.http.post(API_URL + 'update',{id,supplie_name,price,unit_name});
  }

  updateUnitSupplie(supplieId:number,unit:number,year:string): Observable<any> {
    return this.http.post(API_URL + 'unit',{supplieId,unit,year});
  }
  updateUnit(supplieId:number,unit:number,year:string): Observable<any> {
    return this.http.post(API_URL + 'unitup',{supplieId,unit,year});
  }

  getSupById(id:number,year:string): Observable<any>{
    return this.http.post(API_URL + 'getsup',{id,year});
  }

  filter(filter: string,year:string): Observable<any>{
    return this.http.post(API_URL+'filter', {
        filter,year
    });
  }

  insertBuyForm(userId:number,buyprice:number,supplie:Array<any>,units:Array<any>,sum:Array<any>,name:string): Observable<any> {
    return this.http.post('http://localhost:8080/api/buy/insert',{userId,buyprice,supplie,units,sum,name});
  }

  reportSupplie(){
    return window.open('http://localhost:8080/api/report/supplielist');
  }

}
