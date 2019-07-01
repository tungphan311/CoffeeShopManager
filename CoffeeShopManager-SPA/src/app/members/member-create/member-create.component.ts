import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_service/member.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
  @ViewChild('createForm') createForm :NgForm;
  @HostListener('window:beforeunload',['$event'])

  members : Member[];
  model: any={};
  member: Member;
  memberGender = '';
  genderlist = ['Nam','Nữ','Khác'] ;
  events: string[] = [];
  regExp = new RegExp(/[0]+(86|32|33|34|35|36|37|38|39|70|76|78|79|77|81|82|83|85|84|56|59|58|97|96|98|90|93|89|88|91|94|92)([0-9]{7})\b/g);

  constructor(
    private router: Router,
    private memberService: MemberService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.getMembers();
   
  }

  getMembers() {
    this.memberService.getAllMembers().subscribe(data =>{
      this.members = data;
    });
  }

  getGender(input, output): boolean {
    if (input === output) {
      this.memberGender = output;
      return true;
    }

    return false;
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.model.dateOfBirth = event.value;
  }

  createTime(): Date{   
    var today = new Date();
    return today;
  }

  check(model:any, members: Member[]): boolean{
    if(model.dateOfBirth>=this.createTime()){
      this.alertify.error('Ngày sinh không hợp lệ')
      return false;
    }
    if(!model.phone.match(this.regExp)) {
      this.alertify.error('Số điện thoại không hợp lệ')
      return false;
    }
    for(const iterator of members){
      if(iterator.phone === model.phone){
        this.alertify.error('Số điện thoại đã được đăng ký')
        return false; 
      }
    }
    return true;
  }

  createStaff(){
    if(this.check(this.model,this.members)===true){
      this.model.createdDate = this.createTime();
      this.memberService.create(this.model).subscribe(next => {
        this.alertify.success('Add Member successfully');
      this.router.navigate(['/member']);
      },error =>{
        this.alertify.error(error);
      })
    }
  }
}
