import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BudgetYearService {

  constructor(private http: HttpClient) { }

  budgetYear(){
    var date = new Date()
    var date2 = date.toISOString().split('T')[0]
    var month = date.getMonth()
    console.log(month)
    var y = (date.getFullYear()+543).toString().substring(2,4)
    console.log(date2)
    var year
    if(3!< month &&  month <11){
      year = 1 + '/' + y
      // console.log('รอบที่ 1')
    } else {
      year = 2 + '/' + y
      // console.log('รอบที่ 2')
    }
    return year
  }

  getBudget(userId:number,budget_year:string): Observable<any>{
    return this.http.post('http://localhost:8080/api/offer/budget',{userId,budget_year})
  }

  budgetYearUser(date:any){
    var month = date.getMonth()
    console.log(month)
    var y = (date.getFullYear()+543).toString().substring(2,4)
    var date2 = date.toISOString().split('T')[0]
    var year
    if(3!< month &&  month <11){
      year = 1 + '/' + y
      // console.log('รอบที่ 1')
    } else {
      year = 2 + '/' + y
      // console.log('รอบที่ 2')
    }
    return year
  }

  getDate(){
    var date = new Date()
    var date2 = date.toISOString().split('T')[0]
    return date2
  }


}
