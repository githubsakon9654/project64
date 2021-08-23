import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { UserService } from 'src/app/shared/service/user.service';
import { DuReportComponent } from './du-report/du-report.component';

interface Food {
  value: string;
  viewValue: string;
}

const API_URL = 'http://localhost:8080';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {


  form: any = {
    link:null
  };
  userRole:boolean = false
  year:string = ''
  private roles: Array<any> =[]

  constructor(
    private tokenStorageService: TokenStorageService,
    private budget : BudgetYearService,
    private userService:UserService,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.getRole()
    this.year = this.budget.budgetYear()
    console.log(this.year)
    if(this.userRole){
      this.foods = this.user
    } else {
      this.foods = this.admin
    }
  }
  admin: Food[] = [
    {value: '/api/report/supplielist/', viewValue: 'รายงานพัสดุ'},
    {value: '/api/report/durablelist/', viewValue: 'รายงานครุภัณฑ์'},
    {value: '/api/report/offerlist/', viewValue: 'รายงานแบบเสนอ'},
    {value: '/api/report/borrowlist/', viewValue: 'รายงานยืม'},
    {value: '/api/report/reveallist/', viewValue: 'รายงานเบิก'},
    {value: '/api/report/buylist/', viewValue: 'รายงานสั่งซื้อ'},
    {value: '/api/report/returnAll/', viewValue: 'รายงานคืน'},
  ]
  user: Food[] = [
    {value: '/api/report/supplielist/', viewValue: 'รายงานพัสดุ'},
    {value: '/api/report/durablelist/', viewValue: 'รายงานครุภัณฑ์'},
    {value: '/api/report/offerlist/', viewValue: 'รายงานแบบเสนอ'},
    {value: '/api/report/borrowuser/', viewValue: 'รายงานยืม'},
    {value: '/api/report/revealuser/', viewValue: 'รายงานเบิก'},
    {value: '/api/report/return/', viewValue: 'รายงานคืน'},
  ]
  foods: Food[] = [];

  getRole(){
    this.roles = this.tokenStorageService.getRole()
    this.userRole = this.roles[1].IsUser
  }

  onSubmit(){
    const {link} = this.form
    console.log(API_URL + link)
    console.log(this.userRole)
    const id = Number(this.userService.getId())
    if(!this.userRole){
      if(link == '/api/report/durablelist/'){
        console.log('durable')
        const dialogdu = this.dialog.open(DuReportComponent,{
          width: '500px',
          height: '500px'
        });
      } else {
        return window.open(API_URL + link + this.year + '/'+ id)
      }
    } else {
      if(link == '/api/report/durablelist/'){
        console.log('durable')
      } else {
        return window.open(API_URL + link + this.year + '/' + id)
      }

    }
  }
}
