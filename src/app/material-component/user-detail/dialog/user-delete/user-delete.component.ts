import { Component, OnInit ,Inject} from '@angular/core';
import { UserService ,DialogData} from '../../../../shared/service/user.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserDetailComponent} from '../../user-detail.component'
@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    console.log(this.data.fullname)
  }

  close(){
    this.dialogRef.close()
  }

  deleteUser(){
    console.log(this.data.id)
    this.userService.deleteUser(this.data.id).subscribe(
      data => {
        console.log(data)
      }
    )
    this.dialogRef.close(true)
  }

}

@Component({
  selector: 'app-user-reset',
  templateUrl: 'user-reset.component.html'
})
export class UserResetComponent implements OnInit {

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    console.log(this.data.id)
  }

  close(){
    this.dialogRef.close()
  }

  reset(){
    this.userService.resetPass(this.data.id).subscribe(
      data => {
        console.log(data)
      }
    )
    this.dialogRef.close(true)
  }

}
