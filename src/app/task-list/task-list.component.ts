import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskListService } from '../services/task-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewTaskComponent } from '../shared/new-task/new-task.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { HttpService } from '../services/http.service';
import { DetailedViewComponent } from '../shared/detailed-view/detailed-view.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  authSub: Subscription;
  userData;
  @Input() isEditMode: boolean;
  @Input() task: Task;
  @Input() id: number;
  tasks: Task[];
  Math = Math;

  constructor(private tasklistService:TaskListService, private dialog: MatDialog, private httpService: HttpService,  private auth: AuthService){}

  ngOnInit(): void {
    this.authSub = this.auth.currentUser.subscribe(data =>{
      this.userData = data
    })
    this.tasks = this.tasklistService.getTasks();
    this.tasklistService.taskListChanged.subscribe((tasks) => this.tasks = tasks);
  }
  openNew(id?:number):void {
    this.id = id
    const dialogRef = this.dialog.open(NewTaskComponent, {
      height: '26em',
      width: '52em',
      data: {
        id: id
      }
    });
  }
  onView(id: number){
    const dialogRef = this.dialog.open(DetailedViewComponent, {
      height: '28em',
      width: '50em',
      data: {
        id: id
      }
    });
  }
  onDelete(id:number){
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      height: '20em',
      width: '50em',
      data: {
        id: id
      }
    });
  }
  onEdit(id:number){
    this.openNew(id);
  }

  priorityChange(event: any, id: number){
    this.id = id
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.priority = inputValue
    this.tasklistService.updateTask(this.id, this.task);
    this.httpService.saveTasksToFirebase(this.userData);
  }

  statusChange(event: any, id: number){
    this.id = id
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.status = inputValue
    this.tasklistService.updateTask(this.id, this.task);
    this.httpService.saveTasksToFirebase(this.userData);
  }

  titleChange(event: any, id:number){
    this.id = id
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.title = inputValue
    this.tasklistService.updateTask(this.id, this.task);
    this.httpService.saveTasksToFirebase(this.userData);
  }

}
