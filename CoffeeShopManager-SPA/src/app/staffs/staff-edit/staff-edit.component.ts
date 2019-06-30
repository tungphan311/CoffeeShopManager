import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Staff } from 'src/app/_models/Staff';
import { StaffService } from 'src/app/_service/staff.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';

 
@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit {
  @ViewChild('editForm') editForm :NgForm;
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  events: string[] = [];
  staff: Staff;
  staffGender = '';
  genderlist = ['Male','Female','Other'] ;
  constructor(
    private staffService: StaffService, 
    private alertify: AlertifyService, 
    private route : ActivatedRoute) { }
  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.staff = data['staff'];
      this.defaultPhoto(this.staff);
    });
  }

  defaultPhoto(staff) : Staff {
    if(this.staff.photo===""||this.staff.photo ===null){
      this.staff.photo = "https://makitweb.com/demo/broken_image/images/noimage.png"
    }
    return staff;
  }

  reload(){
    location.reload();
  }
  updateStaff(){
    this.staffService.updateStaff(this.staff).subscribe(next => {
    this.alertify.success('Thông tin cập nhật thành công');
    this.editForm.reset(this.staff);
    this.reload();
    },error =>{
      this.alertify.error(error);
    })
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
  updateMainPhoto(photoUrl) {
    this.staff.photo = photoUrl;
  }
  loadDate(staff): string{
    var dateString = '';
    let date = new Date(this.staff.dateOfBirth);

    // console.log(this.staff.dateOfBirth);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    
    dateString = day +'/'+ month +'/' + year;
    return dateString;
  }
  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.staff.dateOfBirth = event.value;
  }
}
