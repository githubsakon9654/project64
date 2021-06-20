import { Component, OnInit, ViewChild,TemplateRef,Inject,AfterViewInit } from '@angular/core';
import { SupplieService } from '../../shared/service/supplie.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import {FormControl} from '@angular/forms';
import {Observable,from } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';
import { StoreComponent } from './store/store.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
export interface DialogData {
  id : number;
  sup_name: string;
  price: number;
  unit: number;
  unit_name: string;
}

@Component({
  selector: 'app-supplielist',
  templateUrl: './supplielist.component.html',
  styleUrls: ['./supplielist.component.css']
})
export class SupplielistComponent implements OnInit {

  sup_row: Array<any> =[]
  sup_name: string =''
  price: number = 0
  unit: number = 0
  unit_name: string =''
  private roles: Array<any> =[]
  delete : boolean = false
  adminRole: boolean = false
  userRole:boolean = false
  year:string = ''
  // paginator:any
  displayedColumns: string[] = ['id', 'supplie_name','price', 'unit', 'unit_name','store','delete'];


  constructor(
    public supplieServie: SupplieService,
    private tokenStorageService: TokenStorageService,
    public dialog: MatDialog,
    private budget:BudgetYearService
    ) { }



  ngOnInit(): void {
   this.loadRow()
   this.getRole()
  }




  getRole(){
    this.roles = this.tokenStorageService.getRole()
    this.userRole = this.roles[1].IsUser

  }

  openDialog(){
    const dialogRef = this.dialog.open(SupplieInsertComponent);
    dialogRef.afterClosed().subscribe( r => {
      this.loadRow();
    })
  }
  openDialogStore(){
    const dialogRef = this.dialog.open(StoreComponent);
    dialogRef.afterClosed().subscribe( r => {
      this.loadRow();
    })
  }


  inputSup(e:any){
    const name = e.supplie_name;
    const id = e.supplieId;
    console.log(id)
    const unit = e.unit
    console.log(unit)
    const dialogRef = this.dialog.open(SupplieInputComponent,{
      width: '350px',
      data: {id: id, sup_name:name,unit:unit}
    });
    dialogRef.afterClosed().subscribe( r => {
      this.loadRow();
    })
  }

  deleteRow(e: any){
    const name = e.supplie_name;
    const id = e.id;
    const dialogRef = this.dialog.open(SupplieDeleteComponent,{
      data: {sup_name: name, id: id}
    });
    dialogRef.afterClosed().subscribe( r => {
      this.loadRow();
    })
  }

  loadRow(){
    this.year = this.budget.budgetYear()
    console.log(this.year)
    this.supplieServie.getAllSup(this.year).subscribe(
      data => {
        this.sup_row = data.sup
        console.log(this.sup_row)
      }
    )
  }

  report(){
    this.supplieServie.reportSupplie()
    console.log('print')
  }

  openDetail(e:any){
    const name = e.supplie_name;
    const id = e.id;
    const price = e.price;
    const unit = e.unit;
    const unit_name = e.unit_name;

    const dialogRef = this.dialog.open(SupplieUpdateComponent,{
      data: {sup_name: name, id: id, price: price, unit: unit, unit_name:unit_name}
    });
    dialogRef.afterClosed().subscribe( r => {
      this.loadRow();
    })
  }

}

@Component({
  selector: 'app-supplie-update',
  templateUrl: 'supplieUpdata.component.html'
})
export class SupplieUpdateComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['แพ็ค', 'ชิ้น', 'ห่อ','ตัว'];
  filteredOptions = new Observable

  form: any = {
    sup_name:this.data.sup_name,
    price: this.data.price,
    unit_name: this.data.unit_name,
  };


  constructor(
    public supplieServie: SupplieService,
    public dialogRef: MatDialogRef<SupplieUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(){
    console.log(this.data.id)
    console.log('up')
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(){
    this.update()
    this.close()
  }
  close(): void {
    this.dialogRef.close();
  }

  update(){
    const id = this.data.id - 1
    console.log(id)
    const {sup_name,price,unit,unit_name} = this.form;
    this.supplieServie.updateSupplie(id,sup_name,price,unit_name).subscribe(
      data => {
        console.log(sup_name)
      }
    )
  }

}

@Component({
  selector: 'app-supplie-input',
  templateUrl: 'supplieInput.component.html'
})
export class SupplieInputComponent {

  form: any = {
    unit: null,
  };

  constructor(
    public supplieServie: SupplieService,
    public dialogRef: MatDialogRef<SupplieInputComponent>,
    private supYearService: BudgetYearService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onSubmit(){
      var res = (+this.data.unit) + (+this.form.unit)
      console.log(res)
      this.input(this.data.id,+this.form.unit)
      this.dialogRef.close()
    }

    input(id:number,unit:number){
      var year:string = this.supYearService.budgetYear()
      this.supplieServie.updateUnitSupplie(id,unit,year).subscribe(
        data => {
        }
      )
    }

}


@Component({
  selector: 'app-supplie-delete',
  templateUrl: 'supplieDelete.component.html'
})
export class SupplieDeleteComponent {
  constructor(
    public supplieServie: SupplieService,
    public dialogRef: MatDialogRef<SupplieDeleteComponent>,
    private budget:BudgetYearService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onClick(): void {
    var year = this.budget.budgetYear()
    const id = this.data.id -1
    console.log(id)
    console.log(year)
    this.supplieServie.deleteSupplie(id,year).subscribe(
      data => {
        console.log(data)
      }
    )
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }
}

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-supplie-insert',
  templateUrl: 'supplieInsert.component.html'
})
export class SupplieInsertComponent implements OnInit{
  myControl = new FormControl();
  options: string[] = ['แพ็ค', 'ชิ้น', 'ห่อ','ตัว'];
  filteredOptions = new Observable
  year:string =''
  form: any = {
    sup_name: null,
    price: null,
    stores:null,
    unit_name: null
  };

  store: Food[] = [];

  constructor(
    public supplieServie: SupplieService, public routes: Router,
    public dialogRef: MatDialogRef<SupplieInsertComponent>,
    private budget: BudgetYearService
    ) { }

  ngOnInit() {
    this.year = this.budget.budgetYear()
    this.loadStore()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  loadStore(){
    this.supplieServie.getStore().subscribe(
      date => {
        this.store = date.store
        console.log(this.store)
      }
    )
  }

  onSubmit(){
    const {sup_name,price,unit_name,stores} = this.form;
    this.supplieServie.createSupplie(sup_name,price,unit_name,+stores,this.year).subscribe(
      data => {
        console.log(sup_name)
      }
    )
    this.close()

  }

  close(): void {
    this.dialogRef.close();
  }
}

