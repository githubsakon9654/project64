import { Component, OnInit ,Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { DurableService, Item} from '../../../../shared/service/durable.service';

@Component({
  selector: 'app-insert-durable',
  templateUrl: './insert-durable.component.html',
  styleUrls: ['./insert-durable.component.css']
})
export class InsertDurableComponent implements OnInit {

  form: any = {
    du_name:null,
    du_status: null,
    du_serial: null,
  };

  constructor(
    private dialogRef: MatDialogRef<InsertDurableComponent>,
    private durable: DurableService
  ) { }

  ngOnInit(): void {}



  onSubmit(){
    const {du_name,du_status,du_serial} = this.form
    this.durable.create(du_name,du_status,du_serial).subscribe(
      data => {}
    )
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-update-durable',
  templateUrl: './update-durable.component.html'
})
export class UpdateDurableComponent implements OnInit{

  form: any = {
    du_name:this.data.du_name,
    du_status: this.data.du_status,
    du_serial: this.data.du_serial,
    userId:this.data.userId
  };
  private roles: Array<any> =[]
  userRole:boolean = false

  constructor(
    private dialogRef: MatDialogRef<UpdateDurableComponent>,
    private tokenStorageService: TokenStorageService,
    private durable: DurableService,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  ngOnInit(): void {
    console.log(this.data.userId)
    this.getRole()
  }

  getRole(){
    this.roles = this.tokenStorageService.getRole()
    this.userRole = this.roles[1].IsUser
    console.log(this.userRole)
  }

  onSubmit(){
    const id = +this.data.id
    const {du_name,du_status,du_serial} = this.form
    this.durable.update(id,du_name,du_status,du_serial).subscribe(
      data => {}
    )
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-delete-durable',
  templateUrl: './delete-durable.component.html'
})
export class DeleteDurableComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<DeleteDurableComponent>,
    private durable: DurableService,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  ngOnInit(): void {
    console.log(+this.data.id)
  }

  onClick(){
    this.durable.deleteDurable(+this.data.id).subscribe(
      data => {}
    )
    this.dialogRef.close()
  }

  close(){this.dialogRef.close()}

}

@Component({
  selector: 'app-setnull-durable',
  templateUrl: './setnull-durable.component.html'
})
export class SetnullDurableComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<SetnullDurableComponent>,
    private durable: DurableService,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  ngOnInit(): void {
    console.log()
  }

  onClick(){
    this.durable.updateOwnerNull(+this.data.id,null).subscribe(
      data => {}
    )
    this.dialogRef.close()
  }

  close(){this.dialogRef.close()}
}


