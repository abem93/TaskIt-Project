import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TaskListService } from 'src/app/services/task-list.service';
import { Task } from '../../task-list/task.model';
import { DeleteModalComponent } from 'src/app/task-list/delete-modal/delete-modal.component';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css'],
})
export class DetailedViewComponent implements OnInit {
  id: number;
  task: Task = new Task(0, '', '', '', '', '', '');

  constructor(
    private taskListService: TaskListService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.data.id !== undefined) {
      this.id = this.data.id;
      this.task = this.taskListService.getTask(this.id);
    }
  }

  onDelete(){
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      height: '20em',
      width: '50em',
      data: {
        id: this.id
      }
    });
  }

  onEdit(){
    const dialogRef = this.dialog.open(NewTaskComponent, {
      height: '31em',
      width: '62em',
      data: {
        id: this.id
      }
    });
  }
}
