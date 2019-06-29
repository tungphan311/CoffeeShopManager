import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../_service/user.service';
import { StaffService } from '../_service/staff.service';
import { User } from '../_models/User';
import { Staff } from '../_models/Staff';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  accessCodeList = ['admin', 'manager', 'cashier'];
  users: User[];
  staffs: Staff[];
  staffsHasNoAccount: number[];

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService,
    private staffService: StaffService,
    private router: Router
  ) { }

  // @Output() cancelRegister = new EventEmitter();

  model: any = {};

  ngOnInit() {
    this.model.accessCode = 'all';
    this.findAllStaff();
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Register successful');
      location.reload();
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    this.router.navigate(['../home']);
    // location.reload();
  }

  getCode(code): string {
    if (code === 'admin') {
      return 'Admin';
    } else if (code === 'manager') {
      return 'Nhân viên quản lý';
    } else if (code === 'cashier') {
      return 'Nhân viên thu ngân';
    }
  }

  selectCode(code) {
    this.model.accessCode = code;
  }

  isExist(list, id): boolean {
    let result = false;
    list.forEach(user => {
      if (user.staffId === id) {
        result = true;
      }
    });

    return result;
  }

  findAllStaff() {
    this.staffsHasNoAccount = [];
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;

      this.staffService.getAllEmployees().subscribe((staffs: Staff[]) => {
        this.staffs = staffs;

        staffs.forEach(staff => {
          if (!this.isExist(users, staff.id)) {
            this.staffsHasNoAccount.push(staff.id);
          }
        });
      });
    });
  }

  selectStaff(id) {
    this.model.staffId = id;
  }

  getStaffName(id): string {
    return this.staffs[id - 1].name;
  }
}
