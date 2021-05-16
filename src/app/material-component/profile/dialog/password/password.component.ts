import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService,DialogData} from '../../../../shared/service/user.service'
import { TokenStorageService } from '../../../../shared/service/token-storage.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  hide = true;
  hide2 = true;
  hide3 = true;
  status:boolean= false
  oldpass:number = 0;
  form: any = {
    password: null,
    newpassword:null,
    new:null
  };

  constructor(
    public dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    public dialogRef: MatDialogRef<PasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    console.log(this.data.id)
    // this.userService.check(+this.data.id).subscribe(
    //   data => {
    //     this.oldpass = data.pass
    //     console.log(this.oldpass)
    //   }
    // )
  }

  onSubmit() : void {
    const { password,newpassword} = this.form;
    console.log(password)

    this.userService.changePass(+this.data.id,password,newpassword).subscribe(
      data=>{
        console.log(data.pass)
        this.status = data.pass
        this.dialogRef.close(this.status)
      }
    )

  }

}
