import { Component, OnInit,Inject } from '@angular/core';
import { BuyService,DialogData } from 'src/app/shared/service/buy.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-buy-comment',
  templateUrl: './buy-comment.component.html',
  styleUrls: ['./buy-comment.component.css']
})
export class BuyCommentComponent implements OnInit {

  form: any = {
    comment: null
  }

  constructor(
    private buyService: BuyService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BuyCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    console.log(this.data.id)
  }

  onSubmit(){
    console.log(this.form.comment)
    console.log(this.data.id)
    this.buyService.setComment(this.data.id,this.form.comment).subscribe()
    this.dialogRef.close()
  }

}
