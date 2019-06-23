import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './_service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './_service/user.service';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // @ViewChild('nav') nav: NavComponent;

  title = 'ABC Coffee Shop';
  jwtHelper = new JwtHelperService();

  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.userService.getUser(this.authService.decodedToken.nameid).subscribe(user => {
        this.authService.accessCode = user.accessCode;
      });
    }
  }
}
