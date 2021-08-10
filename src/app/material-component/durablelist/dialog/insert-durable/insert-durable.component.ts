import { Component, OnInit ,Inject} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { DurableService, Item} from '../../../../shared/service/durable.service';
import {Observable,from } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';



interface Food {
  value: string;
  viewValue: string;
}
interface status {
  value: string;
}
interface cate {
  id: number;
  name: string;
  serial: string;
}
@Component({
  selector: 'app-insert-durable',
  templateUrl: './insert-durable.component.html',
  styleUrls: ['./insert-durable.component.css']
})
export class InsertDurableComponent implements OnInit {

  events: string[] = [];
  d: string = ''
  cates: cate[] = [];
  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);
    console.log(event.value)
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  form: any = {
    du_name:null,
    du_status: null,
    du_serial: null,
    du_cate:null,
    du_price:null,
    get:null,
    date:null
  };

  constructor(
    private dialogRef: MatDialogRef<InsertDurableComponent>,
    private durable: DurableService
    ) { }

    ngOnInit(): void {
      this.getCate()
    }

  foods: Food[] = [
    {value: 'มสจ.7110.001.', viewValue: 'โต๊ะเก้าอี้นักเรียน'},
    {value: 'มสจ.7210.001.', viewValue: 'ตู้'},
    {value: 'มสจ.7310.001.', viewValue: 'อื่นๆ'}
  ];

  status: status[]=[
    {value: 'ปกติ'},
    {value: 'ชำรุด'},
    {value: 'เสื่อมสภาพ'},
    {value: 'สูญหาย'}
  ]

  getCate() {
    this.durable.getDuCate().subscribe(
      date => {
        this.cates = date.ducate
        console.log(this.cates)
      }
    )
  }

  onSubmit(){
    const {du_name,du_status,du_serial,du_cate,du_price,date,get} = this.form
    var ser = ''
    this.durable.getDuCateByid(du_serial).subscribe(
      data =>{
        ser = data.ducate[0].serial;
        console.log(ser)

        var start = (date).toISOString()
        var s = start.substring(0,10)
        const serial = 'มสจ.' + ser + '.' + '0' + du_cate
        console.log(serial)
        this.durable.create(du_name,du_status,serial,du_price,s,get,du_serial).subscribe(
          data => {
            console.log(data)
          }
        )
      }
      );
      // switch(+du_serial){
        //   case 1:
        //     ser = '7110.001'
        //     break;
        //   case 2:
        //     ser = ''
    //     break;
    //   case 3:
    //     ser = ''
    //     break;
    //   case 4:
    //     ser = ''
    //     break;
    //   case 5:
    //     ser = ''
    //     break;
    // }
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-update-durable',
  templateUrl: './update-durable.component.html'
})
export class UpdateDurableComponent implements OnInit{

  status: status[]=[
    {value: 'ปกติ'},
    {value: 'ชำรุด'},
    {value: 'เสื่อมสภาพ'},
    {value: 'สูญหาย'}
  ]
  form: any = {
    du_name:this.data.du_name,
    du_status: this.data.du_status,
    du_serial: this.data.du_serial,
    userId:this.data.userId,
    du_price: this.data.du_price,
    get: this.data.get
  };
  private roles: Array<any> =[]
  userRole:boolean = false

  constructor(
    private dialogRef: MatDialogRef<UpdateDurableComponent>,
    private tokenStorageService: TokenStorageService,
    private durable: DurableService,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  ngOnInit(): void {
    console.log(this.data.userId)
    this.getRole()
  }

  getRole(){
    this.roles = this.tokenStorageService.getRole()
    this.userRole = this.roles[1].IsUser
    console.log(this.userRole)
  }

  onSubmit(){
    const id = +this.data.id
    const {du_name,du_status,du_serial,du_price,get} = this.form
    this.durable.update(id,du_name,du_status,du_serial,du_price,get).subscribe(
      data => {}
    )
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-delete-durable',
  templateUrl: './delete-durable.component.html'
})
export class DeleteDurableComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<DeleteDurableComponent>,
    private durable: DurableService,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  ngOnInit(): void {
    console.log(+this.data.id)
  }

  onClick(){
    this.durable.deleteDurable(+this.data.id).subscribe(
      data => {}
    )
    this.dialogRef.close()
  }

  close(){this.dialogRef.close()}

}

@Component({
  selector: 'app-setnull-durable',
  templateUrl: './setnull-durable.component.html'
})
export class SetnullDurableComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<SetnullDurableComponent>,
    private durable: DurableService,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  ngOnInit(): void {
    console.log(+this.data.id)
  }

  onClick(){
    this.durable.updateOwnerNull(+this.data.id,null,null).subscribe(
      data => {}
    )
    this.dialogRef.close()
  }

  close(){this.dialogRef.close()}
}


