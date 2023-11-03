import { Component } from '@angular/core';
import { TaskListService } from 'src/app/task-list/task-list.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
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
