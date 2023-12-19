import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/services/http.service';



@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit, OnDestroy {
  authSub: Subscription;

  constructor(private httpService: HttpService, private authService: AuthService){}

  ngOnInit(){
    this.authSub = this.authService.currentUser.subscribe(data => {

      this.httpService.fetchTasksFromFirebase(data);
      this.httpService.fetchUserFromFirebase(data)
    })


  }
  ngOnDestroy(): void {
     this.authSub.unsubscribe();
  }
}
