import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_service/member.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm :NgForm;
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  events: string[] = [];
  member: Member;
  memberGender = '';
  genderlist = ['Male','Female','Other'] ;
  constructor(
    private memberService: MemberService, 
    private alertify: AlertifyService, 
    private route : ActivatedRoute) { }
  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.member = data['member'];
      this.defaultPhoto(this.member);
    });
  }

  defaultPhoto(member) : Member {
    if(this.member.gender==='Female')
      this.member.photo = "https://www.leesaccountants.co.uk/sites/www.leesaccountants.co.uk/files/images/grey_silhouette_female.png?1516283889";
    else this.member.photo = "https://moseschengo.com/wp-content/uploads/2015/03/avatar-male.jpg"
    return member;
  }

  reload(){
    location.reload();
  }
  updateMember(){
    this.memberService.updateMember(this.member).subscribe(next => {
    this.alertify.success('Profile updated successfully');
    this.editForm.reset(this.member);
    this.reload();
    },error =>{
      this.alertify.error(error);
    })
  }


  getGender(input, output): boolean {
    if (input === output) {
      this.memberGender = output;
      return true;
    }

    return false;
  }

  changeGender(gender) {
    this.member.gender = gender;
  }

  loadDate(member): string{
    var dateString = '';
    let date = new Date(this.member.dateOfBirth);

    // console.log(this.staff.dateOfBirth);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    
    dateString = day +'/'+ month +'/' + year;
    return dateString;
  }
  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.member.dateOfBirth = event.value;
  }
}
