import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Staff } from 'src/app/_models/Staff';
import { StaffService } from 'src/app/_service/staff.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { iterator } from '@progress/kendo-angular-grid/dist/es2015/utils';

 
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
  staffs: Staff[];
  genderchange: boolean;
  datechange: boolean;
  events: string[] = [];
  staff: Staff;
  staffGender = '';
  genderlist = ['Male','Female','Other'] ;
  regEmail = new RegExp(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm);
  regExp = new RegExp(/[0]+(86|32|33|34|35|36|37|38|39|70|76|78|79|77|81|82|83|85|84|56|59|58|97|96|98|90|93|89|88|91|94|92)([0-9]{7})\b/g);
  constructor(
    private staffService: StaffService, 
    private alertify: AlertifyService, 
    private route : ActivatedRoute) { }
  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.staff = data['staff'];
      this.defaultPhoto(this.staff);
    });
    this.getStaffs();
  }

  getStaffs() {
    this.staffService.getAllEmployees().subscribe(data =>{
      this.staffs = data;
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
    if(this.check(this.staff, this.staffs)===true){
      this.staffService.updateStaff(this.staff).subscribe(next => {
        this.alertify.success('Thông tin cập nhật thành công');
        this.editForm.reset(this.staff);
        this.reload();
        },error =>{
          this.alertify.error(error);
        })
    }
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

    this.genderchange = this.genderOnChange();
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
    this.datechange = this.dateChange();
  }


  formChange():boolean{
    if(this.genderchange||this.datechange) return false;
    else return true;
  }
  createTime(): Date{   
    var today = new Date();
    return today;
  }
  genderOnChange():boolean{
    return true;
  }

  dateChange():boolean{
    return true;
  }
  check(model:any, staffs: Staff[]): boolean{
    if(model.dateOfBirth>=this.createTime()){
      this.alertify.error('Ngày sinh không hợp lệ')
      return false;
    }
    if(!model.phone.match(this.regExp)) {
      this.alertify.error('Số điện thoại không hợp lệ')
      return false;
    }
    for(const iterator of staffs){
      if(iterator.phone === model.phone){
        if(iterator.id != model.id){
          this.alertify.error('Số điện thoại đã được đăng ký')
          return false; 
        }
       
      }
    }
    if(!model.email.match(this.regEmail)){
      this.alertify.error('Email không hợp lệ')
      return false;
    }
    for(const iterator of staffs){
      if(iterator.email === model.email){
        if(iterator.id!= model.id){
          this.alertify.error('Email đã được đăng ký')
          return false; 
        }
        
      }
    }
    
    return true;
  }
}
