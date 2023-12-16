import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData;
  userEmail;
  userProfile;
  userName;
  constructor(
    private authService: AuthService,
    private httpService: HttpService
  ) {}
  ngOnInit(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.userEmail = this.userData.email;
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    this.userName = this.userProfile.name;
  }

  onLogout() {
    this.authService.logout();
  }
}
