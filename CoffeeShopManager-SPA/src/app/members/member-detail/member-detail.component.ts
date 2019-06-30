import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_service/member.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router : Router,
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
  deleteClick(){
    this.member.isDelete = true;
    this.memberService.updateMember(this.member).subscribe(next => {
    this.alertify.success('Profile deleted successfully');
    this.router.navigate(['/member']);
    },error =>{
      this.alertify.error(error);
    })
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



  defaultPhoto(member) : Member {
    if(this.member.gender==='Nữ')
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
