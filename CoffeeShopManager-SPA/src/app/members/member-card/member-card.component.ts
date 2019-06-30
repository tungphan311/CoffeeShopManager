import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_service/member.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  teamlist = [];
  

  // tslint:disable-next-line:typedef-whitespace
  // tslint:disable-next-line:variable-name
  constructor(
    private memberService: MemberService, 
    private alertify: AlertifyService, 
    private route : ActivatedRoute) { }
  reload(){
    location.reload();
  }
  deleteClick(){
    this.member.isDelete = true;
    this.memberService.updateMember(this.member).subscribe(next => {
    this.alertify.success('Profile updated successfully');
    this.reload();
    },error =>{
      this.alertify.error(error);
    })
  }
  defaultPhoto():void {

  }
  ngOnInit() {
    
  }

}
