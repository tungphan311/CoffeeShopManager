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
    selectedValue: 0;
    noResult = false;
    selectedOption= 0;
    staffs: Staff[];
    staffsForFilter: Staff[];
    staff: Staff = JSON.parse(localStorage.getItem('staff'));
    staffParams: any = {};
    pagination: Pagination;

  constructor(private staffService: StaffService, private alertify: AlertifyService, private route: ActivatedRoute,
    private routelink: Router) { }

  ngOnInit() {
    
    this.getStaffs();
    // this.staffParams.gender = this.staff.gender === 'female' ? 'male' : 'female';
    // this.staffParams.minAge = 18;
    // this.staffParams.maxAge = 99;
    this.defaultPhoto(this.staffs);
    console.log(this.staffs);
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.staffs = this.staffs.filter(x => x.id === this.selectedOption['id']);
  }

  getStaffs() {
    this.route.data.subscribe(data =>{
      this.staffs = data['staffs'].result;
      this.pagination = data ['staffs'].pagination;
      this.staffs = this.staffs.filter(x => x.isDelete === false);
    });
  }

  onChange() {
    console.log('Change');
    this.getStaffs();
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadStaffs();
  }


  // resetFilter() {
  //   this.staffParams.gender = this.staff.gender === 'female' ? 'male' : 'female';
  //   this.staffParams.minAge = 18;
  //   this.staffParams.maxAge = 99;
  //   this.loadStaffs();
  // }

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