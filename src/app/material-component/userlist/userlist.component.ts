import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserService} from '../../shared/service/user.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  row: Array<any> = []
  data: Array<any> = []
  
  key: String =''
  year:string =''

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private budgetService: BudgetYearService
    ) { }

  ngOnInit(): void {
    this.year = this.budgetService.budgetYear()
    console.log( this.year)
    this.loadUser(this.year)
  }

  loadUser(budget:string){
    var row2: Array<any> = []
    this.userService.getAllUsers(budget).subscribe(
      data => {
        this.data = data.users
        var length = this.data.length
        for(var i=0;i<length;i++){
          if(this.data[i].budget_year == this.year){
            row2.push(this.data[i])
            this.row = row2
          }
        }
        console.log(this.row)
      }
    )
  }

  open(){
    const register = this.dialog.open(RegisterComponent);
    register.afterClosed().subscribe(result => {
      this.loadUser(this.year)
    });
  }
  openDetail(row: any){
    console.log(row.budget)
    const detail = this.dialog.open(UserDetailComponent,{
      width: '800px',
      data: {id: row.id,username: row.username, fullname:row.fullname, classes: row.classes,budget: row.budget}
    });
    detail.afterClosed().subscribe(
      r => {
        this.loadUser(this.year)
      }
    )
  }

  displayedColumns: string[] = ['id','username', 'fullname','classes','budget'];

}
