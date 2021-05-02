import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/supplie/';

@Injectable({
  providedIn: 'root'
})
export class SupplieService {

  constructor(private http: HttpClient) { }

  createSupplie(supplie_name: string, price:number, unit:number, unit_name:string): Observable<any> {
    return this.http.post(API_URL + 'insert',{supplie_name,price, unit, unit_name});
  }

  getAllSup(): Observable<any> {
    return this.http.get(API_URL + 'listall');
  }

  deleteSupplie(id:number): Observable<any>{
    return this.http.post(API_URL + 'delete',{id})
  }

  updateSupplie(id:number,supplie_name: string, price:number, unit:number, unit_name:string): Observable<any> {
    return this.http.post(API_URL + 'update',{id,supplie_name,price, unit,unit_name});
  }

  updateUnitSupplie(id:number,unit:number): Observable<any> {
    return this.http.post(API_URL + 'update',{id,unit});
  }

  getSupById(id:number): Observable<any>{
    return this.http.get(API_URL + 'getsup/' + id);
  }

  filter(filter: string): Observable<any>{
    return this.http.post(API_URL+'filter', {
        filter
    });
  }

  insertBuyForm(userId:number,buyprice:number,supplie:Array<any>,units:Array<any>): Observable<any> {
    return this.http.post('http://localhost:8080/api/buy/insert',{userId,buyprice,supplie,units});
  }

  reportSupplie(){
    return window.open('http://localhost:8080/api/report/supplielist');
  }

}
