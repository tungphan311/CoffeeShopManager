import { Component, OnInit } from '@angular/core';
import { Staff } from '../../_models/Staff';
import { StaffService } from '../../_service/staff.service';
import { AlertifyService } from '../../_service/alertify.service';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';
import { TypeaheadMatch } from 'ngx-bootstrap';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
    selectedValue: String;
    noResult = false;
    selectedOption = StaffListComponent;
    staffs: Staff[];
    staff: Staff = JSON.parse(localStorage.getItem('staff'));
    genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}, {value: 'other', display: 'Others'}];
    staffParams: any = {};
    pagination: Pagination;

  constructor(private staffService: StaffService, private alertify : AlertifyService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.staffs = data['staffs'].result;
      this.pagination = data ['staffs'].pagination;
    });

    this.staffParams.gender = this.staff.gender === 'female' ? 'male' : 'female';
    this.staffParams.minAge = 18;
    this.staffParams.maxAge = 99;
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

  resetFilter() {
    this.staffParams.gender = this.staff.gender === 'female' ? 'male' : 'female';
    this.staffParams.minAge = 18;
    this.staffParams.maxAge = 99;
    this.loadStaffs();
  }

  loadStaffs(){
      this.staffService.getStaffs(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe((res: PaginatedResult<Staff[]>) => {
          this.staffs = res.result;
          this.pagination = res.pagination;
      }, error => {
          this.alertify.error(error);

      })
  }
}