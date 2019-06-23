import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // @ViewChild('app') app: AppComponent;
  model: any = {};
  public accessCode = '';
  jwtHelper = new JwtHelperService();

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  getAccessCode(): string {
    return this.authService.accessCode;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }
}
