import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskListService } from './task-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewTaskComponent } from './new-task/new-task.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

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

}
