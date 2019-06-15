import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // @ViewChild('login') login: LoginComponent;
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log("Logged in successfuully!")
    }, error => {
      console.log("failed to login")
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log("Logged out");
  }
}
