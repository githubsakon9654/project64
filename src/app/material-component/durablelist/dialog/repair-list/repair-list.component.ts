import { Component, OnInit } from '@angular/core';
import { DurableService } from 'src/app/shared/service/durable.service';
import { RepairServiceService } from 'src/app/shared/service/repair-service.service';

@Component({
  selector: 'app-repair-list',
  templateUrl: './repair-list.component.html',
  styleUrls: ['./repair-list.component.css']
})
export class RepairListComponent implements OnInit {

  datarow = [];
  data:Array<Object> = [];

  constructor(
    private repairService: RepairServiceService
  ) { }
  displayedColumns: string[] = ['id','du_name','du_serial', 'name', 'detail','price','create'];
  ngOnInit(): void {
    this.repairService.all_list().subscribe(
      d => {
        this.datarow = d.repair
        this.loopThaiDate(this.datarow)
        console.log(this.datarow)
      }
    )
  }

  loopThaiDate(dateR:Array<any>){
    var len = dateR.length;
    var row:Array<Object> = []
    for(let i=0; i < len; i++){
      console.log(dateR[i].Date)
            var dates = dateR[i].Date
            var month = dates.substring(5, 7);
            var year = +((dates).substring(2, 4)) + 43;
            var day = (dates).substring(8, 10);
            var THmonth;
            switch (+month) {
                case 1:
                    THmonth = ' ม.ค. ';
                    break;
                case 2:
                    THmonth = ' ก.พ. ';
                    break;
                case 3:
                    THmonth = ' มี.ค. ';
                    break;
                case 4:
                    THmonth = ' เม.ย. ';
                    break;
                case 5:
                    THmonth = ' พ.ค. ';
                    break;
                case 6:
                    THmonth = ' มิ.ย. ';
                    break;
                case 7:
                    THmonth = ' ก.ค. ';
                    break;
                case 8:
                    THmonth = ' ส.ค. ';
                    break;
                case 9:
                    THmonth = ' ก.ย. ';
                    break;
                case 10:
                    THmonth = ' ตุ.ค. ';
                    break;
                case 11:
                    THmonth = ' พฤ.ย. ';
                    break;
                case 12:
                    THmonth = ' ธ.ค. ';
            }
            var THdate = day + THmonth + year;
            console.log(THdate)
            var id = dateR[i].id
            row.push({id:dateR[i].id,Date:THdate,du_name:dateR[i].du_name,du_serial:dateR[i].du_serial
            ,rep_detail:dateR[i].rep_detail,rep_name:dateR[i].rep_name,rep_price:dateR[i].rep_price})

          }
          this.data = row
          console.log(this.data)
  }

}
