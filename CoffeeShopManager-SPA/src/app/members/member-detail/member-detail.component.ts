import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_service/member.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member : Member;

  constructor(
    private memberService: MemberService, 
    private alertify: AlertifyService, 
    private route : ActivatedRoute) { }

  ngOnInit() {
    var dateString = '';
    console.log(this.route.data);
    this.route.data.subscribe(data =>{
      this.member = data['member']; 
      this.defaultPhoto(this.member);
    });
    console.log(this.member);
  }


  loadDate(member): string{
    var dateString = '';
    dateString = this.member.dateOfBirth.toString();
    dateString = dateString.slice(0,10);
    return dateString;
  }



  defaultPhoto(member) : Member {
    if(this.member.gender==='Female')
      this.member.photo = "https://www.leesaccountants.co.uk/sites/www.leesaccountants.co.uk/files/images/grey_silhouette_female.png?1516283889";
    else this.member.photo = "https://moseschengo.com/wp-content/uploads/2015/03/avatar-male.jpg"
    return member;
  }

  loadMember(){
    this.memberService.getMember(this.route.snapshot.params['id']).subscribe((member: Member)=>{
      this.member = member;
    },error => {
      this.alertify.error(error);
    });
  }

}
