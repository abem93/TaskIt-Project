import { Component, Inject, OnInit } from '@angular/core';
import { TaskListService } from '../../services/task-list.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../task.model';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  id: number;
  task: Task;
  constructor(private tasklistService: TaskListService, @Inject(MAT_DIALOG_DATA) private data:any){
    this.id = this.data.id
  }

  ngOnInit(): void {
    this.task = this.tasklistService.getTask(this.id)
  }
  onDelete(){
    this.tasklistService.removeTask(this.id);
  }


}
