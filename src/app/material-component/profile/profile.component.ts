import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService} from '../../shared/service/user.service'
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { PasswordComponent } from './dialog/password/password.component';



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

  constructor(
    public dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    const id = Number(this.userService.getId())
    this.id = id
    this.userService.getUserId(id).subscribe(
      data => {
        console.log(this.id)
        this.id = data.user.id
        this.name = data.user.fullname
        this.classes = data.user.classes
        this.price = data.user.price
        this.username = data.user.username
      }
    )
  }

  openChangePass(){
    const dialog = this.dialog.open(PasswordComponent,{
      width: '500px',
      data: {id:this.id}
    })
  }

}
