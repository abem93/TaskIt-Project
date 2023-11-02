import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  notification = ('New Task Created:  "Run"')
  show = true
  constructor(){}

  ngOnInit(): void {
      this.showNotification()
  }

  showNotification(){
    if(this.show === true){
      setTimeout(() => {
        this.show = false;
       }, 2000);
      }
    }

}
