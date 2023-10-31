import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskListService } from './task-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewTaskComponent } from './new-task/new-task.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private tasklistService:TaskListService, private dialog: MatDialog){}

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
    this.tasklistService.taskListChanged.subscribe((tasks) => this.tasks = tasks)
  }
  onDelete(id:number){
    console.log(this.tasks);
    this.tasklistService.removeTask(id);

  }
  onEdit(id:number){
    this.isEditMode = true;
    this.tasklistService.startedEditing.next(id);
    this.openNew(id)

  }

}
