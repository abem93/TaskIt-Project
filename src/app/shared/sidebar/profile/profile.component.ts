import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userData = JSON.parse(localStorage.getItem('userData'))
  userEmail = this.userData.email
  userName
  constructor(private authService: AuthService){
  }
  onLogout(){
    this.authService.logout();
  }
}
