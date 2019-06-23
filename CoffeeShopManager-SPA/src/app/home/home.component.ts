import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  elements: any = [
    {id: 1, ten: 'Phan Thanh Tùng', mssv: '1652....'},
    {id: 2, ten: 'Nguyễn Đăng Quang', mssv: '1652....'},   
    {id: 3, ten: 'Nguyễn Ngọc Nghĩa', mssv: '1652....'},
    {id: 4, ten: 'Lê Việt Hoàng', mssv: '1652....'},
  ];

  headElements = ['ID', 'Tên', 'MSSV'];

  registerMode = false;
  values: any;

  constructor(
    private http: HttpClient,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
