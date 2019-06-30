import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_service/member.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
  @ViewChild('createForm') createForm :NgForm;
  @HostListener('window:beforeunload',['$event'])

   
  model: any={};
  member: Member;
  memberGender = '';
  genderlist = ['Male','Female','Other'] ;
  events: string[] = [];


  constructor(
    private memberService: MemberService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) {}

  ngOnInit() {
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

  createStaff(){
    this.model.createdDate = this.createTime();
    this.memberService.create(this.model).subscribe(next => {
      this.alertify.success('Add Member successfully');
    this.createForm.reset(this.model);
    location.reload();
    },error =>{
      this.alertify.error(error);
    })
  }
}
