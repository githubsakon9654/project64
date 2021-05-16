import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DurableService ,Item} from 'src/app/shared/service/durable.service';
import { RepairServiceService } from 'src/app/shared/service/repair-service.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { InsertRepairComponent } from './dialog/insert-repair/insert-repair.component';

@Component({
  selector: 'app-durable-repair',
  templateUrl: './durable-repair.component.html',
  styleUrls: ['./durable-repair.component.css']
})
export class DurableRepairComponent implements OnInit {
  datarow = [];
  constructor(
    private dialogRef: MatDialogRef<DurableRepairComponent>,
    private tokenStorageService: TokenStorageService,
    private durable: DurableService,
    private repair: RepairServiceService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  ngOnInit(): void {
    this.loadTable()
  }
  
  displayedColumns: string[] = ['id', 'name', 'detail','price','create'];

  loadTable(){
    this.repair.getListRepair(+this.data.id).subscribe(
      d => {
        this.datarow = d.repair
        console.log(d)
      }
    )
    console.log(this.data.du_name)
    console.log(this.data.du_serial)
  }

  openInsert(){
    const dialog = this.dialog.open(InsertRepairComponent,{
      data:{id:this.data.id}
    })
    dialog.afterClosed().subscribe(
      d => {
        this.loadTable()
      }
    )
  }

}
