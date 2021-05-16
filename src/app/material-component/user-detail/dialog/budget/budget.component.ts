import { Component, OnInit,Inject } from '@angular/core';
import { UserService ,DialogData} from '../../../../shared/service/user.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  myControl = new FormControl();

  form: any = {
    budget: null,
  };
  year:string =''

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private budgetService: BudgetYearService,
    public dialogRef: MatDialogRef<BudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    console.log(this.data.id)
    this.year = this.budgetService.budgetYear()
  }

  onSubmit(){
    const {budget} = this.form
    console.log(budget)
    console.log(this.year)
    this.userService.insertBudget(this.data.id,this.year,budget).subscribe()
    this.dialogRef.close()
  }

}
