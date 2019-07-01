import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';
import { MemberService } from 'src/app/_service/member.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  genderList= ['Nam', 'Nữ'];
  model= {selectedName: '',
  selectedPhone: '',
  selecetedAddress: '',
  selectedGender: '',
  selectedAge: '',};
  selectedOption: Member[];
  members: Member[];

  member: Member = JSON.parse(localStorage.getItem('member'));
  memberParams: any = {};
  pagination: Pagination;

constructor(private memberService: MemberService, private alertify: AlertifyService, private route: ActivatedRoute,
  private routelink: Router) { }

ngOnInit() {
  
  this.getMembers();
  this.defaultPhoto(this.members);
  console.log(this.members);
}

onSelectName(event: TypeaheadMatch): void {
  this.selectedOption = event.item;
  this.members = this.members.filter(x => x.name === this.selectedOption['name']);
}

onSelectPhone(event: TypeaheadMatch): void {
  this.selectedOption = event.item;
  this.members = this.members.filter(x => x.phone === this.selectedOption['phone']);
}

onSelectAddress(event: TypeaheadMatch): void {
  this.selectedOption = event.item;
  this.members = this.members.filter(x => x.address === this.selectedOption['address']);
}

onSelectGender(gender): void {
  this.model.selectedGender = gender;
  this.members = this.members.filter(x => x.gender = this.selectedOption['gender']);
}


getMembers() {
  this.route.data.subscribe(data =>{
    this.members = data['members'].result;
    this.pagination = data ['members'].pagination;
    this.members = this.members.filter(x => x.isDelete === false);
  });
}

isValid(num): boolean {
  if (isNaN(+num)) {
    return false;
  }
  return true;
}

formatLabel(value: number | null) {
  if (!value) {
    return 0;
  }

  // if (value >= 1000) {
  //   return Math.round(value);
  // }

  return value;
}

applyFilter() {
  let memberParams: any = {};
  memberParams.name = this.model.selectedName;
  memberParams.phone = this.model.selectedPhone;
  memberParams.address = this.model.selecetedAddress;
  memberParams.gender = this.model.selectedGender;
  this.memberService.getListMember(memberParams).subscribe(result => {
    this.members = result.result;
    this.members = this.defaultPhoto(result.result);
  });
}

onChange() {

  this.getMembers();
}

pageChanged(event: any): void {
  this.pagination.currentPage = event.page;
  this.loadMembers();
}


resetFilter() {
  this.model.selectedName = this.model.selectedPhone = this.model.selecetedAddress = this.model.selectedGender  = '';
  this.applyFilter();
}


defaultPhoto(members) : Member[] {
  for(const interator of members){
    if(interator.gender =='Nữ')
      interator.photo = "https://www.leesaccountants.co.uk/sites/www.leesaccountants.co.uk/files/images/grey_silhouette_female.png?1516283889"
    else interator.photo = "https://moseschengo.com/wp-content/uploads/2015/03/avatar-male.jpg"
    console.log(interator.gender);
  }
  return members;
}

loadMembers(){
    this.memberService.getMembers(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Member[]>) => {
        
        this.members = res.result;
        this.pagination = res.pagination;
        this.defaultPhoto(this.members);
        this.members = this.members.filter(x => x.isDelete === false);
    }, error => {
        this.alertify.error(error);
    })
}

toCreatePage(){
  // debugger
  this.routelink.navigate(['/add']);
}
}
