import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService} from '../../shared/service/user.service'
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { PasswordComponent } from './dialog/password/password.component';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id:number= 0
  name:string =''
  classes:string =''
  price: number = 0
  username:string=''
  password:string=''
  year:string =''

  constructor(
    public dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private budget:BudgetYearService
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.year = this.budget.budgetYear()
    const id = Number(this.userService.getId())
    this.id = id
    this.userService.getUserId(id,this.year).subscribe(
      data => {
        console.log(this.id)
        console.log(data)
        this.id = data.user.id
        this.name = data.user.fullname
        this.classes = data.user.classes
        this.username = data.user.username
        this.price = data.budget.budget
      }
    )
  }

  openChangePass(){
    const dialog = this.dialog.open(PasswordComponent,{
      width: '500px',
      data: {id:this.id}
    })
    dialog.afterClosed().subscribe(r =>{
      console.log(r)
      if(r == false){
        window.alert('เปลี่ยนรหัสผ่านล้มเหลว รหัสผ่านเก่าผิด')
      } else {
        window.alert('เปลี่ยนรหัสผ่านสำเร็จ')
      }
    })
  }

}
