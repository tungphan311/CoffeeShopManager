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
    public selectedOption: string;
    staffs: Staff[];
    staff: Staff = JSON.parse(localStorage.getItem('staff'));
    staffParams: any = {};
    pagination: Pagination;

  constructor(private staffService: StaffService, private alertify: AlertifyService, private route: ActivatedRoute,
    private routelink: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.staffs = data['staffs'].result;
      this.pagination = data ['staffs'].pagination;
    });

    // this.staffParams.gender = this.staff.gender === 'female' ? 'male' : 'female';
    // this.staffParams.minAge = 18;
    // this.staffParams.maxAge = 99;
    this.defaultPhoto(this.staffs);
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
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
    console.log("Dit me");
    return staffs;
  }
  loadStaffs(){
      this.staffService.getStaffs(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe((res: PaginatedResult<Staff[]>) => {
          // this.defaultPhoto(res);
          this.staffs = res.result;
          this.pagination = res.pagination;
      }, error => {
          this.alertify.error(error);
      })
  }
  
  toCreatePage(){
    // debugger
    this.routelink.navigate(['/create']);
  }
}