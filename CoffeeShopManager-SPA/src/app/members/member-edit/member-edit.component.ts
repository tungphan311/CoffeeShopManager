import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_service/member.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

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

  currentmember: Member;
  members: Member[];
  events: string[] = [];
  member: Member;
  memberGender = '';
  genderlist = ['Nam','Nữ','Khác'] ;
  regExp = new RegExp(/[0]+(86|32|33|34|35|36|37|38|39|70|76|78|79|77|81|82|83|85|84|56|59|58|97|96|98|90|93|89|88|91|94|92)([0-9]{7})\b/g);
  genderchange: boolean;
  datechange: boolean;
  isinfochanged=false;

  constructor(
    private memberService: MemberService, 
    private alertify: AlertifyService, 
    private route : ActivatedRoute) { }
  ngOnInit() {
    this.getMembers();
    this.route.data.subscribe(data =>{
      this.member = data['member'];
      this.defaultPhoto(this.member);
    });
    this.memberService.getMember(this.member.id).subscribe(data =>{
      this.currentmember = data;
      this.currentmember.dateOfBirth=new Date(this.currentmember.dateOfBirth.toString());
    });
  }

  infoChange():void{
    console.log('imhere');
    // console.log(this.currentmember.dateOfBirth.toString());
    // console.log(this.member.dateOfBirth.toString());
    if (this.currentmember.name!=this.member.name
      ||this.currentmember.address!=this.member.address
      ||this.currentmember.phone!=this.member.phone
      ||this.dateToString(this.currentmember.dateOfBirth)!=this.dateToString(this.member.dateOfBirth)
      ){
      this.isinfochanged=true;}
      else{
      this.isinfochanged=false;}
  }

  // formChange():boolean{
  //   if(this.genderchange||this.datechange) return false;
  //   else return true;
  // }

  dateChange():boolean{
    return true;
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
        if(iterator.id === model.id) {
          return true;
        }
        else {
          this.alertify.error('Số điện thoại đã được đăng ký')
          return false; 
        }
      }
    }
    return true;
  }
  createTime(): Date{   
    var today = new Date();
    return today;
  }

  defaultPhoto(member) : Member {
    if(this.member.gender==='Nữ')
      this.member.photo = "https://www.leesaccountants.co.uk/sites/www.leesaccountants.co.uk/files/images/grey_silhouette_female.png?1516283889";
    else this.member.photo = "https://moseschengo.com/wp-content/uploads/2015/03/avatar-male.jpg"
    return member;
  }

  reload(){
    location.reload();
  }
  updateMember(){
    if(this.check(this.member,this.members)===true){
      console.log(this.member);
      this.memberService.updateMember(this.member).subscribe(next => {
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.member);
        this.reload();
        },error =>{
          this.alertify.error(error);
        })
    }
  }

  genderChange(): void{
    if(this.currentmember.gender!=this.member.gender)
    this.isinfochanged=true;
    else
    this.isinfochanged=false;
  }

  dateToString(date):string{
    var dateString = '';

    // console.log(this.staff.dateOfBirth);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    
    dateString = day +'/'+ month +'/' + year;
    return dateString;
  }
  loadDate(): string{
    var dateString = '';
    let date = new Date(this.member.dateOfBirth);

    // console.log(this.staff.dateOfBirth);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    
    dateString = day +'/'+ month +'/' + year;
    return dateString;
  }
  getMembers() {
    this.memberService.getAllMembers().subscribe(data =>{
      this.members = data;
    });
  }
  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.member.dateOfBirth = event.value;
    if (type=='change')
    this.infoChange();
  }
}
