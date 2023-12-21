import { Component, Inject, OnInit } from '@angular/core';
import { TaskListService } from '../../services/task-list.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../task.model';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  authSub: Subscription;
  userData;
  id: number;
  task: Task;
  constructor(private tasklistService: TaskListService, @Inject(MAT_DIALOG_DATA) private data:any, private httpService: HttpService, private auth: AuthService){
    this.id = this.data.id
  }

  ngOnInit(): void {
    this.authSub = this.auth.currentUser.subscribe(data =>{
      this.userData = data
    })
    this.task = this.tasklistService.getTask(this.id)
  }
  onDelete(){
    this.tasklistService.removeTask(this.id);
    this.httpService.saveTasksToFirebase(this.userData);
  }


}
