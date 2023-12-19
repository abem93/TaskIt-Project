import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  error:string = null;
  constructor(private authService: AuthService, private router: Router, private httpService: HttpService) {}

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData> = this.authService.login(email, password);

    authObs.subscribe(
      (resData) => {
        this.router.navigate(['/tasks']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage
      }
    );
    form.reset();
  }
}
