import { Component, OnInit } from '@angular/core';
import { Staff } from '../../_models/Staff';
import { StaffService } from '../../_service/staff.service';
import { AlertifyService } from '../../_service/alertify.service';
import { error } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';
import { TypeaheadMatch } from 'ngx-bootstrap';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
    model= {selectedName: '',
    selectedPhone: '',
    selecetedAddress: '',
    selectedGender: '',
    selectedAge: ''};
    selectedOption: Staff[];
    staffs: Staff[];
    // staffsForFilter: Staff[];
    staff: Staff = JSON.parse(localStorage.getItem('staff'));
    staffParams: any = {};
    pagination: Pagination;

  constructor(private staffService: StaffService, private alertify: AlertifyService, private route: ActivatedRoute,
    private routelink: Router) { }

  ngOnInit() {
    
    this.getStaffs();
    this.defaultPhoto(this.staffs);
    console.log(this.staffs);
  }

  onSelectName(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.staffs = this.staffs.filter(x => x.name === this.selectedOption['name']);
  }

  onSelectPhone(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.staffs = this.staffs.filter(x => x.phone === this.selectedOption['phone']);
  }

  onSelectAddress(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.staffs = this.staffs.filter(x => x.address === this.selectedOption['address']);
  }

  onSelectGender(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.staffs = this.staffs.filter(x => x.gender === this.selectedOption['gender']);
  }

  // onSelectAge(event: TypeaheadMatch): void {
  //   this.selectedOption = event.item;
  //   this.staffs = this.staffs.filter(x => x.age === this.selectedOption['age']);
  // }

  getStaffs() {
    this.route.data.subscribe(data =>{
      this.staffs = data['staffs'].result;
      this.pagination = data ['staffs'].pagination;
      this.staffs = this.staffs.filter(x => x.isDelete === false);
    });
  }

  isValid(num): boolean {
    if (isNaN(+num)) {
      return false;
    }
    return true;
  }

  applyFilter() {
    let staffParams: any = {};
    staffParams.name = this.model.selectedName;
    staffParams.phone = this.model.selectedPhone;
    staffParams.address = this.model.selecetedAddress;
    staffParams.gender = this.model.selectedGender;
    // staffParams.age = this.model.selectedAge;
    this.staffService.getListStaff(staffParams).subscribe(result => {
      this.staffs = result.result;
      this.staffs = this.defaultPhoto(result.result);
    });
  }

  onChange() {
    console.log('Change');
    this.getStaffs();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadStaffs();
  }


  resetFilter() {
    this.model.selectedName = this.model.selectedPhone = this.model.selecetedAddress = '';
    this.applyFilter();
  }


  defaultPhoto(staffs) : Staff[] {
    for(const interator of staffs){
      if(interator.photo === null || interator.photo === '')
        interator.photo = "https://makitweb.com/demo/broken_image/images/noimage.png"
    }
    return staffs;
  }
  
  loadStaffs(){
      this.staffService.getStaffs(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe((res: PaginatedResult<Staff[]>) => {
          
          this.staffs = res.result;
          this.pagination = res.pagination;
          this.defaultPhoto(this.staffs);
          this.staffs = this.staffs.filter(x => x.isDelete === false);
      }, error => {
          this.alertify.error(error);
      })
  }
  
  toCreatePage(){
    // debugger
    this.routelink.navigate(['/create']);
  }
}