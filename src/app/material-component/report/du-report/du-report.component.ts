import { Component, OnInit } from '@angular/core';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';
import { DurableService } from 'src/app/shared/service/durable.service';
import { UserService } from 'src/app/shared/service/user.service';

interface cate {
  id: number;
  name: string;
  serial: string;
}
const API_URL = 'http://localhost:8080';

@Component({
  selector: 'app-du-report',
  templateUrl: './du-report.component.html',
  styleUrls: ['./du-report.component.css']
})
export class DuReportComponent implements OnInit {

  cates: cate[] = [];
  form: any = {
    id: null,
  };
  year:string = ''

  constructor(
    private budget : BudgetYearService,
    private durable: DurableService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.getCate()
    this.year = this.budget.budgetYear()
  }
  getCate() {
    this.durable.getDuCate().subscribe(
      date => {
        this.cates = date.ducate
        console.log(this.cates)
      }
    )
  }
  onSubmit(){
    const id2 = Number(this.userService.getId())
    const {id} = this.form
    console.log(id)
    return window.open(API_URL + '/api/report/durablelist/' + this.year + '/' + id2 + '/' + id)
  }

}
