import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TaskListService } from 'src/app/task-list/task-list.service';
import { Task } from 'src/app/task-list/task.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  notificationText = '';
  action:string;
  show = false;
  constructor(private taskListService: TaskListService){}

  ngOnInit(): void {
      this.showNotification()
      this.taskListService.taskListChanged.subscribe((tasks)=>
      {
      })
      this.taskListService.notificationSubject.subscribe((notification)=>{
        this.action = notification.action
        console.log(this.action)
        this.notificationText = `${this.action}:  "${notification.task.title}"`;

        this.show = true
        this.showNotification();

      })

  }

  showNotification(){
    if(this.show === true){
      setTimeout(() => {
        this.show = false;
       }, 2500);
    }
    }

}
