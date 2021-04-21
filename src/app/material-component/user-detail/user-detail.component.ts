import { Component, OnInit,Inject } from '@angular/core';
import { UserService ,DialogData} from '../../shared/service/user.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import { UserDeleteComponent, UserResetComponent } from './dialog/user-delete/user-delete.component';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  myControl = new FormControl();

  form: any = {
    username: this.data.username,
    price: this.data.price,
    fullname: this.data.fullname,
    classes: this.data.classes,
  };

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit(): void {
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
