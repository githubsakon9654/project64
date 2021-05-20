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

  constructor(
    private repairService: RepairServiceService
  ) { }
  displayedColumns: string[] = ['id','du_name','du_serial', 'name', 'detail','price','create'];
  ngOnInit(): void {
    this.repairService.all_list().subscribe(
      d => {
        this.datarow = d.repair
        console.log(d.repair)
      }
    )
  }

}
