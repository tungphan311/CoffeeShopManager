import { Component, OnInit, ViewChild } from '@angular/core';
import { Staff } from 'src/app/_models/Staff';
import { StaffService } from 'src/app/_service/staff.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
 
@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit {
  @ViewChild('editForm') editForm :NgForm;
  staff : Staff;
  staffGender = '';
  genderlist = ['Male','Female','Other'] ;
  constructor(
    private staffService: StaffService, 
    private alertify: AlertifyService, 
    private route : ActivatedRoute) { }
  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.staff = data['staff'];
      // var moment = require('moment/moment');
      // var date = moment(this.staff.dateofbirth);
      // var tz = date.u
      
    });
  }
  updateStaff(){
    this.alertify.success('Profile updated successfully');
    this.editForm.reset(this.staff);
  }

  getGender(input, output): boolean {
    if (input === output) {
      this.staffGender = output;
      return true;
    }

    return false;
  }

  changeGender(gender) {
    this.staff.gender = gender;
    console.log(this.staff.gender);
  }
}
