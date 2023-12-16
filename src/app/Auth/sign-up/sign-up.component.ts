import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/enviroment";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent {
  error:string = null;
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}
  FIREBASE_URL = environment.firebaseUrl;
  profile: {
    name
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const name = form.value.Fname + ' ' + form.value.Lname
    const email = form.value.email;
    const password = form.value.password;
    console.log(name)
    let authObs: Observable<AuthResponseData>;


    authObs = this.authService.signup(email, password);


    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.router.navigate(['/login']);
        this.profile = {name}
        this.http.put(this.FIREBASE_URL+ 'users/' + resData.localId + '/profile.json', this.profile).subscribe((data) => {
          return data
        });
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage
      }
    );

    form.reset();
  }
}
