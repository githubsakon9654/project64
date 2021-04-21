import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserService} from '../../shared/service/user.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  row: Array<any> = []
  key: String =''

  constructor(public dialog: MatDialog,private userService: UserService) { }

  ngOnInit(): void {
    this.loadUser()
  }

  loadUser(){
    this.userService.getAllUsers().subscribe(
      data => {
        this.row = data.users
        console.log(this.row)
      }
    )
  }

  open(){
    const register = this.dialog.open(RegisterComponent);
    register.afterClosed().subscribe(result => {
      this.loadUser()
    });
  }
  openDetail(row: any){
    const detail = this.dialog.open(UserDetailComponent,{
      width: '1500px',
      data: {id: row.id,username: row.username, fullname:row.fullname, classes: row.classes, price: row.price}
    });
    detail.afterClosed().subscribe(
      r => {
        this.loadUser()
      }
    )
  }

  displayedColumns: string[] = ['id','username', 'fullname','classes' , 'price'];

}
