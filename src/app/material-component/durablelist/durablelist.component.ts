import { Component, OnInit } from '@angular/core';
import { DurableService } from '../../shared/service/durable.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteDurableComponent, InsertDurableComponent, SetnullDurableComponent, UpdateDurableComponent } from './dialog/insert-durable/insert-durable.component';
import { TokenStorageService} from '../../shared/service/token-storage.service'
import { from } from 'rxjs';
import { DurableRepairComponent } from '../durable-repair/durable-repair.component';
import { E } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-durablelist',
  templateUrl: './durablelist.component.html',
  styleUrls: ['./durablelist.component.css']
})
export class DurablelistComponent implements OnInit {
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

  displayedColumns: string[] = ['id', 'du_name', 'du_status', 'du_serial','owner', 'button'];


  getRole(){
    this.roles = this.tokenStorageService.getRole()
    this.userRole = this.roles[1].IsUser

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
      data: {id:row.id,du_name: row.du_name,du_status:row.du_status,du_serial:row.du_serial,userId:row.userId}
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
