import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { LoginComponent } from '../login/login.component';
import { AlertifyService } from '../_service/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // @ViewChild('login') login: LoginComponent;
  model: any = {};
  accessCode = '';

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loggedIn() {
    this.accessCode = this.authService.accessCode;
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }
}
