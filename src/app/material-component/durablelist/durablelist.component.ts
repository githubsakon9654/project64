import { Component, OnInit } from '@angular/core';
import { DurableService } from '../../shared/service/durable.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteDurableComponent, InsertDurableComponent, SetnullDurableComponent, UpdateDurableComponent } from './dialog/insert-durable/insert-durable.component';
import { TokenStorageService} from '../../shared/service/token-storage.service'
import { from } from 'rxjs';
import { DurableRepairComponent } from '../durable-repair/durable-repair.component';
import { E } from '@angular/cdk/keycodes';
import { RepairListComponent } from './dialog/repair-list/repair-list.component';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-durablelist',
  templateUrl: './durablelist.component.html',
  styleUrls: ['./durablelist.component.css']
})
export class DurablelistComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  datarow = []
  userRole:boolean = false
  private roles: Array<any> =[]
  constructor(
    private durableService: DurableService,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTable()
    this.getRole()
  }

  displayedColumns: string[] = ['id', 'du_name', 'du_status', 'du_serial','price','get','owner', 'button'];


  getRole(){
    this.roles = this.tokenStorageService.getRole()
    this.userRole = this.roles[1].IsUser

  }

  
  getDate(){
    var start = (this.range.value.start).toISOString()
    var s = start.substring(0,10)
    var end = (this.range.value.end).toISOString()
    var e = end.substring(0,10)
    console.log(this.range.value.start)
    console.log(this.range.value.end)
    console.log(s)
    console.log(e)
    // this.Source.getDAteList(s,e).subscribe(
    //   date => {
    //     this.table = date.date
    //     console.log(this.table)
    //   }
    // )
  }

  loadTable(){
    this.durableService.getAllDurable().subscribe(
      data => {
        this.datarow = data.durable
        console.log(this.datarow)
      }
    )
  }

  openRepair(e:any){
    const repair = this.dialog.open(DurableRepairComponent,{
      width: '1500px',
      data: {id:e.id,du_name:e.du_name,du_serial:e.du_serial}
    })
  }

  openReport(){
    this.durableService.reportDurable()
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
  openSetnull(row:any){
    const set = this.dialog.open(SetnullDurableComponent,{
      width: '280px',
      data: {id: row.id,du_serial:row.du_serial,du_name:row.du_name}
    })
    set.afterClosed().subscribe(d => {
      this.loadTable()
    })
  }

  openDetail(row:any){
    const edit = this.dialog.open(UpdateDurableComponent,{
      data: {id:row.id,du_name: row.du_name,du_status:row.du_status,du_serial:row.du_serial,userId:row.userId,du_price:row.du_price,get:row.get}
    })
    edit.afterClosed().subscribe( d => {
      this.loadTable()
    })
  }

  openRepairlist(){
    const list = this.dialog.open(RepairListComponent,{
      width: '1500px'
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
