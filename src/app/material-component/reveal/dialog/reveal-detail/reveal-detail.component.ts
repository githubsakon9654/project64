import { Component, OnInit,Inject} from '@angular/core';
import { RevealService,Item } from '../../../../shared/service/reveal.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TokenStorageService } from '../../../../shared/service/token-storage.service';


export interface DialogData {
  id : number;
  sup_name: string;
  price: number;
  unit: number;
  unit_name: string;
  keys: string;
  keytwo: string;
}

@Component({
  selector: 'app-reveal-detail',
  templateUrl: './reveal-detail.component.html',
  styleUrls: ['./reveal-detail.component.css']
})
export class RevealDetailComponent implements OnInit {
  table: Array<any> = []
  name: string = ''
  cls: string = ''
  total: number = 0
  isAdmin: boolean = false;
  isUser:boolean = false;
  adminApp: boolean = false;
  direApp: boolean = false;
  isDirec: boolean = false;
  revealID:number = 0;
  private roles: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<RevealDetailComponent>,
    private revealService: RevealService,
    private token:TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit(): void {
    this.loadTable(this.data.id);
    this.getRole();
  }

  displayedColumns: string[] = ['supplieId','supplie_name','price', 'unit', 'unit_name', 'delete'];

  loadTable(id:number){
    this.revealService.getRevealDetail(id).subscribe(
      data => {
        console.log(data.reveal)
        this.table = data.reveal
        this.name = data.reveal[0].fullname
        this.cls = data.reveal[0].class
        this.total = data.reveal[0].total_price
        this.adminApp = data.appove[0].admin_approve
        this.direApp = data.appove[0].dire_approvev
        this.revealID = data.reveal[0].id
        console.log(this.adminApp)
        console.log(this.direApp)
      }
    )
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
    console.log(this.direApp)
    this.revealService.updateApprove(this.revealID,this.adminApp,this.direApp).subscribe(
      data =>{}
    )
  }



}
