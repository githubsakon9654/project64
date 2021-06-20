import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';
import { SupplieService } from 'src/app/shared/service/supplie.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  form: any = {
    name: null,
    contect: null,
  };

  constructor(
    public supplieServie: SupplieService,
    private tokenStorageService: TokenStorageService,
    public dialog: MatDialog,
    private budget:BudgetYearService,
    public dialogRef: MatDialogRef<StoreComponent>
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const {name,contect} = this.form
    console.log(name)
    this.supplieServie.pushStore(name,contect).subscribe(
      d => {}
    )
    this.dialogRef.close();
  }

}
