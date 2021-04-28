import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SupplieService } from '../../shared/service/supplie.service';
import { UserService} from '../../shared/service/user.service'
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { ReturnsService,Item} from '../../shared/service/returns.service';
import { DurableService} from '../../shared/service/durable.service';
import { UpdateDurableComponent } from '../durablelist/dialog/insert-durable/insert-durable.component';

@Component({
  selector: 'app-durable-own',
  templateUrl: './durable-own.component.html',
  styleUrls: ['./durable-own.component.css']
})
export class DurableOwnComponent implements OnInit {

  table: Array<any> = []
  role: Array<any> = []
  adAppove: boolean = false
  diAppove: boolean = false
  isUser: boolean = false
  id:number= 0
  datarow = []

  constructor(
    public Source: ReturnsService,
    public dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    public durable: DurableService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadTable()
  }
  displayedColumns: string[] = ['id', 'du_name', 'du_status', 'du_serial','owner', 'button'];

  loadTable(){
    const id = Number(this.userService.getId())
    this.id = id
    this.durable.getUserDurable(id).subscribe(
      data => {
        this.datarow = data.durable
        console.log(id)
      }
    )
  }

  open(row:any){
    const edit = this.dialog.open(UpdateDurableComponent,{
      data: {id:row.id,du_name: row.du_name,du_status:row.du_status,du_serial:row.du_serial,userId:row.userId}
    })
    edit.afterClosed().subscribe( d => {
      this.loadTable()
    })
  }
}
