import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { Router, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit, OnDestroy {
  authSub: Subscription;

  constructor(private httpService: HttpService, private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.authSub = this.authService.currentUser.subscribe(data => {
      this.httpService.fetchTasksFromFirebase(data);
      this.httpService.fetchUserFromFirebase(data)
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd  && screen.width < 768) {
        this.toggleSidebar();
      }
    })
  }

  toggleSidebar(){
    document.querySelector('.sidebar').classList.toggle('hidden')
    document.querySelector('.sidebar-container').classList.toggle('w-[12vw]')
    document.querySelector('.sidebar-container').classList.toggle('w-[100vw]')

    document.querySelector('.main-content').classList.toggle('w-full')
    document.querySelector('.main-content').classList.toggle('hidden')
  }

  ngOnDestroy(): void {
     this.authSub.unsubscribe();
  }
}
