import { Component, OnInit, Inject } from '@angular/core';
import { RevealService, Item } from '../../../../shared/service/reveal.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from '../../../../shared/service/token-storage.service';
import { SupplieService } from 'src/app/shared/service/supplie.service';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';


export interface DialogData {
  id: number;
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
  isUser: boolean = false;
  adminApp: boolean = false;
  direApp: boolean = false;
  isDirec: boolean = false;
  isAccept: boolean = false;
  revealID: number = 0;
  private roles: string[] = [];
  public length: number = 0;
  year: string = ''

  constructor(
    public dialogRef: MatDialogRef<RevealDetailComponent>,
    private revealService: RevealService,
    private supService: SupplieService,
    private token: TokenStorageService,
    private budget: BudgetYearService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.loadTable(this.data.id);
    this.getRole();
    this.year = this.budget.budgetYear()
  }

  displayedColumns: string[] = ['supplieId', 'supplie_name', 'price', 'unit', 'unit_name', 'delete'];

  loadTable(id: number) {
    this.revealService.getRevealDetail(id).subscribe(
      data => {
        console.log(data.reveal)
        this.table = data.reveal
        this.length = this.table.length;
        console.log(this.length)
        this.name = data.reveal[0].fullname
        this.cls = data.reveal[0].name
        this.total = data.reveal[0].total_price
        this.adminApp = data.appove[0].admin_approve
        this.isAccept = data.appove[0].accept
        this.revealID = data.reveal[0].id
        console.log(this.adminApp)
        console.log(this.isAccept)
        console.log(this.direApp)
      }
    )
  }

  getRole() {
    const user = this.token.getUser()
    this.roles = user.roles
    this.isAdmin = this.roles.includes('ROLE_ADMIN');
    this.isDirec = this.roles.includes('ROLE_DIRECTOR');
    this.isUser = this.roles.includes('ROLE_USER');
    console.log(this.isAdmin)
    console.log(this.isDirec)
  }

  updateUnit() {
    if (this.adminApp) {
      for (var i = 0; i < this.length; i++) {
        this.revealService.getUnit(this.data.id, this.table[i].supplieId).subscribe(
          data => {
            this.get1(data.get[0].supplieId, data.get[0].unit)
            // this.supService.getSupById(data.get[0].supplieId,this.year).subscribe(
            //   data => {
            //     console.log(data.supplie[0].supplie_name+ " " + data.supplie[0].unit)

            //     // var units = data.supplie[0].unit - tunit
            //     console.log('loopEnd')

            //     // this.supService.updateUnit(data.supplie[0].supplieId,units,this.year).subscribe(
            //     //   data=>{}
            //     // )
            //     // this.revealService.updateRemain(this.revealID,data.supplie[0].supplieId,units).subscribe()
            //   }
            // )
          }
        )
      }
    } else {
      console.log(false)
    }

  }

  get1(supId: number, tunit: number) {
    this.supService.getSupById(supId, this.year).subscribe(
      data => {
        console.log('loopStart')
        console.log(supId)
        console.log(data.supplie[0].supplie_name + " " + data.supplie[0].unit)
        var units = data.supplie[0].unit - tunit
        console.log('เหลือ ' + units);
        console.log('loopEnd')
        if (units < 0) {
          console.log('ไม่ให้ทำ')
          this.revealService.updateApprove(this.revealID, false).subscribe(
            data => { }
          )
        } else {

          this.supService.updateUnit(data.supplie[0].supplieId, units, this.year).subscribe(
            data => { }
          )
          this.revealService.updateRemain(this.revealID, data.supplie[0].supplieId, units).subscribe()
        }

      }
    )
  }

  accept() {
    this.isAccept = true
    console.log(this.revealID)
    this.revealService.updateAccept(this.revealID, this.isAccept).subscribe(
      d => { }
    )
  }

  Appove() {
    console.log(this.adminApp)
    console.log(this.direApp)
    this.revealService.updateApprove(this.revealID, this.adminApp).subscribe(
      data => { }
    )
  }

  reportDetail() {
    this.revealService.reportDetail(this.revealID)
  }



}
