import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DurableService ,Item} from 'src/app/shared/service/durable.service';
import { RepairServiceService } from 'src/app/shared/service/repair-service.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-insert-repair',
  templateUrl: './insert-repair.component.html',
  styleUrls: ['./insert-repair.component.css']
})
export class InsertRepairComponent implements OnInit {

  form: any = {
    name:null,
    detail: null,
    price: null,
  };
  
  constructor(
    private dialogRef: MatDialogRef<InsertRepairComponent>,
    private tokenStorageService: TokenStorageService,
    private durable: DurableService,
    private RepairService: RepairServiceService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  ngOnInit(): void {
    console.log(this.data.id)
  }

  onSubmit(){
    const {name,detail,price} = this.form
    this.RepairService.insertRepair(name,detail,price,+this.data.id).subscribe(
      d => {}
    )
    this.dialogRef.close()
  }

}
