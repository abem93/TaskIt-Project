import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../task-list/task.model';
import { TaskListService } from '../../services/task-list.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit{
  authSub: Subscription;
  userData;
  @ViewChild('taskForm') taskListForm: NgForm;
  id: number;
  task: Task = new Task('','','','','');

  isEditMode: boolean = false;
  editedTask: Task = new Task('','','','','');
  formSubmitted = false;
  boredTitle: string = null


  constructor(private taskListService: TaskListService, @Inject(MAT_DIALOG_DATA) private data:any, private httpService: HttpService, private auth: AuthService ){
      // console.log(this.taskListService.getTask(this.data.id))
      // console.log(data)
  }



  ngOnInit(): void {
    this.authSub = this.auth.currentUser.subscribe(data =>{
      this.userData = data
    })

    if(this.data.id !== undefined){
      this.id = this.data.id
      this.editedTask = this.taskListService.getTask(this.id)
      this.isEditMode= true;
    }else if(this.data.bored){
      this.boredTitle = this.data.bored
      this.editedTask.title = this.boredTitle
    }else{
      this.isEditMode = false
    }
  }


  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    this.task = { ...form.value };
    this.task.title = this.task.title[0].toUpperCase() + this.task.title.slice(1)
    console.log(this.task)

    if (this.isEditMode) {
      this.taskListService.updateTask(this.id, this.task);
    } else {
      this.taskListService.saveTask(this.task);
      form.reset({
      });
    }
    this.isEditMode = false
    this.httpService.saveTasksToFirebase(this.userData);
  }
}
