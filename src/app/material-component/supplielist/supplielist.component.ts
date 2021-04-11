import { Component, OnInit, ViewChild,TemplateRef,Inject } from '@angular/core';
import { SupplieService } from '../../shared/service/supplie.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import {FormControl} from '@angular/forms';
import {Observable,from } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
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

  delete : boolean = false


  constructor(public supplieServie: SupplieService,public dialog: MatDialog) { }


  ngOnInit(): void {
   this.loadRow()
  }

  displayedColumns: string[] = ['id', 'supplie_name','price', 'unit', 'unit_name','delete'];

  openDialog(){
    const dialogRef = this.dialog.open(SupplieInsertComponent);
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
    this.supplieServie.getAllSup().subscribe(
      data => {
        this.sup_row = data.supplies
        console.log(this.sup_row)
      }
    )
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
  options: string[] = ['1', '2', '3'];
  filteredOptions = new Observable

  form: any = {
    sup_name:this.data.sup_name,
    price: this.data.price,
    unit: this.data.unit,
    unit_name: this.data.unit_name,
  };


  constructor(
    public supplieServie: SupplieService,
    public dialogRef: MatDialogRef<SupplieUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(){
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
    const id = this.data.id
    const {sup_name,price,unit,unit_name} = this.form;
    this.supplieServie.updateSupplie(id,sup_name,price,unit,unit_name).subscribe(
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

@Component({
  selector: 'app-supplie-delete',
  templateUrl: 'supplieDelete.component.html'
})
export class SupplieDeleteComponent {
  constructor(
    public supplieServie: SupplieService,
    public dialogRef: MatDialogRef<SupplieDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onClick(): void {
    const id = this.data.id
    this.supplieServie.deleteSupplie(id).subscribe(
      data => {

      }
    )
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-supplie-insert',
  templateUrl: 'supplieInsert.component.html'
})
export class SupplieInsertComponent implements OnInit{
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions = new Observable

  form: any = {
    sup_name: null,
    price: null,
    unit: null,
    unit_name: null
  };

  constructor(public supplieServie: SupplieService, public routes: Router,
    public dialogRef: MatDialogRef<SupplieInsertComponent>) { }

  ngOnInit() {
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
    const {sup_name,price,unit,unit_name} = this.form;
    this.supplieServie.createSupplie(sup_name,price,unit,unit_name).subscribe(
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
