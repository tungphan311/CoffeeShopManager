import { Component, OnInit } from '@angular/core';
import { Staff } from 'src/app/_models/Staff';
import { StaffService } from 'src/app/_service/staff.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {
  staff : Staff;
  constructor(
    private staffService: StaffService, 
    private alertify: AlertifyService, 
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.loadStaff(); 
  }

  loadStaff(){
    this.staffService.getStaff(+this.route.snapshot.params['id']).subscribe((staff: Staff)=>{
      this.staff = staff;
      console.log(staff.age); 
    },error => {
      this.alertify.error(error);
    });
  }

}
