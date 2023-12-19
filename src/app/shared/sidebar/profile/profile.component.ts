import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  httpSub:Subscription;
  userData;
  userEmail;
  userProfile;
  userName;
  constructor(
    private authService: AuthService, private router: Router, private http: HttpService
  ) {}
  ngOnInit(){
    this.httpSub = this.http.userProfile.subscribe(data => {
      this.userProfile = data;
      this.userName = this.userProfile.name;

    });

    this.authService.currentUser.subscribe(data => {
      this.userEmail = data.email
    })

  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }
  ngOnDestroy(): void {
      this.httpSub.unsubscribe();
  }
}
