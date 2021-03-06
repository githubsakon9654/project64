import { Component, OnInit } from '@angular/core';
import { DialogBorComponent } from '../dialog-bor/dialog-bor.component';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BorrowService,Item} from '../../shared/service/borrow.service';
import { DurableService} from '../../shared/service/durable.service';
import { UserService } from '../../shared/service/user.service';
@Component({
  selector: 'app-borrow-durable',
  templateUrl: './borrow-durable.component.html',
  styleUrls: ['./borrow-durable.component.css']
})
export class BorrowDurableComponent implements OnInit {

  public row:Array<Item> = [];
  key :string = '';
  name: string ='';
  user = []

  constructor(
        public Source: BorrowService,
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<BorrowDurableComponent>,
        public durable: DurableService,
        private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadTable()
    const username = String (this.userService.getUsername())
    this.userService.getUser(username).subscribe(
      data => {
        console.log(data)
        this.name = data.user[0].fullname
        console.log(this.user[0])
        console.log(data.user[0].fullname)
      }
    )
    console.log(this.name)
  }
  displayedColumns: string[] = ['id', 'du_name','du_serial', 'du_status','delete'];

  loadTable(){
    this.Source.source$.subscribe({
      next: s => {
        this.row = s
      }
    })
  }


  keytest(){
    const dialogRef = this.dialog.open(DialogBorComponent,{
      data: {key:'borrow'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      localStorage.removeItem('filterKey');
    });
    console.log(this.key);
    localStorage.setItem('filterKey', this.key);
    this.durable.filter(this.key).subscribe(
      data => {
        console.log(data);
      }
    )
  }

  select(){
    const userId = Number(this.userService.getId())
    const username = String (this.userService.getUsername())
    const durable : Array<any> = []
    if(userId){
      for(let i=0; i < this.row.length; i++){
        let array = Number(this.row[i].id)
        durable.push(array)
      }
      this.Source.insertBorrow(userId,this.name,durable).subscribe(
        data => {
          console.log(data)
        }
      )
      console.log(durable)
    }
    this.dialogRef.close()
  }

  deleteRow(row:any){
    const table = [row]
    this.Source.removeServices(table)
  }

}
