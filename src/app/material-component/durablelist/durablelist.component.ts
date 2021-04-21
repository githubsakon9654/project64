import { Component, OnInit } from '@angular/core';
import { DurableService } from '../../shared/service/durable.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteDurableComponent, InsertDurableComponent, UpdateDurableComponent } from './dialog/insert-durable/insert-durable.component';
@Component({
  selector: 'app-durablelist',
  templateUrl: './durablelist.component.html',
  styleUrls: ['./durablelist.component.css']
})
export class DurablelistComponent implements OnInit {
  datarow = []
  constructor(
    private durableService: DurableService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log('test')
    this.loadTable()
  }

  displayedColumns: string[] = ['id', 'du_name', 'du_status', 'du_serial','owner', 'button'];

  loadTable(){
    this.durableService.getAllDurable().subscribe(
      data => {
        this.datarow = data.durable
        console.log(this.datarow)
      }
    )
  }

  openInsert(){
    const dialog = this.dialog.open(InsertDurableComponent,{
      width: '800px'
    })
    dialog.afterClosed().subscribe(
      r => {
        this.loadTable()
      }
    )
  }

  openDetail(row:any){
    const edit = this.dialog.open(UpdateDurableComponent,{
      data: {id:row.id,du_name: row.du_name,du_status:row.du_status,du_serial:row.du_serial}
    })
    edit.afterClosed().subscribe( d => {
      this.loadTable()
    })
  }

  deleteRow(row:any){
    const del = this.dialog.open(DeleteDurableComponent,{
      width: '280px',
      data: {id: row.id,du_serial:row.du_serial,du_name:row.du_name}
    })
    del.afterClosed().subscribe(d => {
      this.loadTable()
    })
  }

}
