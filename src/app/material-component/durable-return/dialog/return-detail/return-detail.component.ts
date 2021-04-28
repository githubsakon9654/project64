import { Component, OnInit,Inject,OnDestroy  } from '@angular/core';
import { RevealService} from '../../../../shared/service/reveal.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TokenStorageService } from '../../../../shared/service/token-storage.service';
import { BorrowService } from 'src/app/shared/service/borrow.service';
import { ReturnsService ,Item} from 'src/app/shared/service/returns.service';
import { SetnullDurableComponent } from 'src/app/material-component/durablelist/dialog/insert-durable/insert-durable.component';

@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrls: ['./return-detail.component.css']
})
export class ReturnDetailComponent implements OnInit,OnDestroy {
  table: Array<any> = []
  name: string = ''
  cls: string = ''
  isAdmin: boolean = false;
  isUser:boolean = false;
  adminApp: boolean = false;
  direApp: boolean = false;
  isDirec: boolean = false;
  returnID:number = 0;
  duID:number = 0;
  private roles: string[] = [];
  array: Array<any> = []

  constructor(
    public dialogRef: MatDialogRef<ReturnDetailComponent>,
    private revealService: RevealService,
    public dialog: MatDialog,
    public returnService: ReturnsService,
    private token:TokenStorageService,
    private borrow: BorrowService,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  ngOnInit(): void {
    this.getRole()
    this.loadTable(+this.data.id)
  }
  ngOnDestroy():void{}

  displayedColumns: string[] = ['id', 'du_name','du_serial', 'du_status','delete'];

  loadTable(id:number){
    this.returnService.getDetail(id).subscribe(
      data => {
        console.log(data)
        this.table = data.return
        console.log(this.table)
        this.getArray()
        this.name = data.return[0].re_name
        this.cls = data.return[0].classes
        this.adminApp = data.status[0].status
        this.returnID = data.return[0].id
      }
    )
  }

  getArray(){
    const length = this.table.length
    for(var i=0;i<length; i++){
      console.log(this.table[i])
      if(this.table[i].userId == null){
        this.array.push(this.table[i].duId);
      }
    }
  }

  getRole(){
    const user = this.token.getUser()
    this.roles = user.roles
    this.isAdmin = this.roles.includes('ROLE_ADMIN');
    this.isDirec = this.roles.includes('ROLE_DIRECTOR');
    this.isUser = this.roles.includes('ROLE_USER');
    console.log(this.isAdmin)
    console.log(this.isDirec)
  }

  Appove(){
    console.log(this.adminApp)
    this.returnService.updateStatus(this.adminApp,+this.returnID).subscribe(
      d => {}
    )
  }

  openSetnull(row:any){
    const set = this.dialog.open(SetnullDurableComponent,{
      width: '280px',
      data: {id: row.duId}
    })
    console.log(row.duId)
    set.afterClosed().subscribe(d => {
    })
  }

}
