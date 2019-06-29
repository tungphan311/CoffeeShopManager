import { Component, OnInit } from '@angular/core';
import { Staff } from 'src/app/_models/Staff';
import { StaffService } from 'src/app/_service/staff.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

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
    var dateString = '';
    this.route.data.subscribe(data =>{
      this.staff = data['staff']; 
      this.defaultPhoto(this.staff);
      var dob = this.staff.dateOfBirth;
    });
  }

  loadDate(staff): string{
    var dateString = '';
    dateString = this.staff.dateOfBirth.toString();
    dateString = dateString.slice(0,10);
    return dateString;
  }



  defaultPhoto(staff) : Staff {
    this.staff.photo = "https://makitweb.com/demo/broken_image/images/noimage.png"
    return staff;
  }

  loadStaff(){
    this.staffService.getStaff(this.route.snapshot.params['id']).subscribe((staff: Staff)=>{
      this.staff = staff;
      console.log('s'); 
    },error => {
      this.alertify.error(error);
    });
  }

}
