import { Component, OnInit } from '@angular/core';
import { Staff } from '../../_models/Staff';
import { StaffService } from '../../_service/staff.service';
import { AlertifyService } from '../../_service/alertify.service';
import { error } from 'util';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
    staffs : Staff[];

  constructor(private staffService: StaffService, private alertify : AlertifyService) { }

  ngOnInit() {
    this.loadStaffs();
  }

  loadStaffs(){
      this.staffService.getStaffs().subscribe((staffs: Staff[])=> {
          this.staffs = staffs;
      },error => {
          this.alertify.error(error);

      })
  }

}
