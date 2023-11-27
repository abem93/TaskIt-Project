import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskListService } from '../services/task-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewTaskComponent } from '../shared/new-task/new-task.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { HttpService } from '../services/http.service';
import { DetailedViewComponent } from '../shared/detailed-view/detailed-view.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  @Input() isEditMode: boolean;
  @Input() task: Task;
  @Input() id: number;
  tasks: Task[];

  constructor(private tasklistService:TaskListService, private dialog: MatDialog, private httpService: HttpService){}

  openNew(id?:number):void {
    this.id = id
    const dialogRef = this.dialog.open(NewTaskComponent, {
      height: '32.25em',
      width: '68.125em',
      data: {
        id: id
      }
    });
  }
  ngOnInit(): void {
    this.tasks = this.tasklistService.getTasks();
    this.tasklistService.taskListChanged.subscribe((tasks) => this.tasks = tasks);
  }
  onDelete(id:number){
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      height: '28.3125em',
      width: '53.4375em',
      data: {
        id: id
      }
    });
    console.log(this.tasks);

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
    this.httpService.saveTasksToFirebase();
  }

  statusChange(event: any, id: number){
    this.id = id
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.status = inputValue
    this.tasklistService.updateTask(this.id, this.task);
    this.httpService.saveTasksToFirebase();
  }

  titleChange(event: any, id:number){
    this.id = id
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.title = inputValue
    this.tasklistService.updateTask(this.id, this.task);
    this.httpService.saveTasksToFirebase();
  }
  onView(id: number){
    const dialogRef = this.dialog.open(DetailedViewComponent, {
      height: '30em',
      width: '50em',
      data: {
        id: id
      }
    });
  }

}
