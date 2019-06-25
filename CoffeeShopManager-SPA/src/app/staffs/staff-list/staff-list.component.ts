import { Component, OnInit } from '@angular/core';
import { Staff } from '../../_models/Staff';
import { StaffService } from '../../_service/staff.service';
import { AlertifyService } from '../../_service/alertify.service';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
    staffs : Staff[];
    pagination: Pagination;

  constructor(private staffService: StaffService, private alertify : AlertifyService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.staffs = data['staffs'].result;
      this.pagination = data ['staffs'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
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
