import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css']
})
export class StaffsComponent implements OnInit {
  dataSource  = [];
  tableColumns: string[] = ['id', 'name', 'teamId', 'gender', 'dateOfBirth', 'phone', 'email', 'address', 'photo'];

  constructor() { }

  ngOnInit() {
  }

}
