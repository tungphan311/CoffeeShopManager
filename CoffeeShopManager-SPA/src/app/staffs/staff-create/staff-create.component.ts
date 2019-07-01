import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Staff } from 'src/app/_models/Staff';
import { StaffService } from 'src/app/_service/staff.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/_service/team.service';
import { NgForm } from '@angular/forms';
import { Team } from 'src/app/_models/Team';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/Photo';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.css']
})
export class StaffCreateComponent implements OnInit {
  @ViewChild('createForm') createForm :NgForm;
  @HostListener('window:beforeunload',['$event'])
  uploader:FileUploader; 
  hasBaseDropZoneOver = false;
  currentMain: Photo;
  unloadNotification($event: any){
    if(this.createForm.valid){
      $event.returnValue = true;
    }
  }
  staffs : Staff[];
  team : Team;
  teams : Team[];
  model: any={};
  staff: Staff;
  staffGender = '';
  genderlist = ['Nam','Nữ','Khác'] ;
  events: string[] = [];
  regEmail = new RegExp(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm);
  regExp = new RegExp(/[0]+(86|32|33|34|35|36|37|38|39|70|76|78|79|77|81|82|83|85|84|56|59|58|97|96|98|90|93|89|88|91|94|92)([0-9]{7})\b/g);

  constructor(
    private router: Router,
    private staffService: StaffService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private _teamService: TeamService) {}

  ngOnInit() {
    // this.defaultPhoto(this.staff);
    this._teamService.getTeams().subscribe(result => {
      this.teams = result;
    });
    this.getStaffs();
  }
  initializeUploader() {
    this.uploader = new FileUploader({});
  }
  getStaffs() {
    this.staffService.getAllEmployees().subscribe(data =>{
      this.staffs = data;
    });
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  createTime(): Date{   
    var today = new Date();
    return today;
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
        this.alertify.error('Số điện thoại đã được đăng ký')
        return false; 
      }
    }
    if(!model.email.match(this.regEmail)){
      this.alertify.error('Email không hợp lệ')
      return false;
    }
    for(const iterator of staffs){
      if(iterator.email === model.email){
        this.alertify.error('Email đã được đăng ký')
        return false; 
      }
    }
  
    return true;
  }


  defaultPhoto(staff): Staff{
    // this.staff.photo = "https://makitweb.com/demo/broken_image/images/noimage.png";
    // console.log(this.staff);
     return staff
  }
  getGender(input, output): boolean {
    if (input === output) {
      this.staffGender = output;
      return true;
    }

    return false;
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.model.dateOfBirth = event.value;
  }

  createStaff(){
    if(this.check(this.model, this.staffs)===true){
      this.staffService.create(this.model).subscribe(next => {
        this.alertify.success('Thêm nhân viên thành công');
      this.createForm.reset(this.model);
      this.router.navigate(['/staff']);
      },error =>{
        this.alertify.error(error);
      })
    }
  }
}
