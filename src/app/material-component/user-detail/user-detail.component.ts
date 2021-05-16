import { Component, OnInit,Inject } from '@angular/core';
import { UserService ,DialogData} from '../../shared/service/user.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import { UserDeleteComponent, UserResetComponent } from './dialog/user-delete/user-delete.component';
import { BudgetComponent } from './dialog/budget/budget.component';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  myControl = new FormControl();
  IsEdit: boolean = false
  year = ''
  budgets:number =0
  form: any = {
    username: this.data.username,
    fullname: this.data.fullname,
    classes: this.data.classes,
  };

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private budgetService: BudgetYearService,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit(): void {
    console.log(this.IsEdit)
    console.log(this.data.budget)
    this.year= this.budgetService.budgetYear()
    this.userService.getBudgetUser(this.data.id,this.year).subscribe(
      d => {
        console.log(d)
        this.budgets = d.user[0].budget
      }
    )
  }

  updateData(){
    const id = this.data.id
    const {username,fullname,classes,price} = this.form
    this.userService.updateUserByAdmin(id,username,classes,price,fullname).subscribe(
      data => {}
    )
  }

  onSubmit(){
    this.updateData()
    this.dialogRef.close()
    
  }

  resetPassword(){
    const dialog = this.dialog.open(UserResetComponent,{
      width: '300px',
      data: {id:this.data.id, fullname:this.data.fullname}
    })
    dialog.afterClosed().subscribe(
      r =>{
        if(r){
          this.dialogRef.close()
        }
      }
    )
  }

  budget(){
    const budget = this.dialog.open(BudgetComponent,{
      data: {id:this.data.id}
    })
  }

  deleteUser(){
    console.log('delete')
    const dialog = this.dialog.open(UserDeleteComponent,{
      width:'250px',
      data: {id:this.data.id,fullname:this.data.fullname}
    })
    dialog.afterClosed().subscribe(
      r =>{
        if(r){
          this.dialogRef.close()
        }
      }
    )
  }

}
