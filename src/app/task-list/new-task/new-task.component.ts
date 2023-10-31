import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../task.model';
import { TaskListService } from '../task-list.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit{
  @ViewChild('taskForm') taskListForm: NgForm;
  id: number;
  task: Task = new Task('','','','','');
  subscription: Subscription;
  isEditMode: boolean = false;
  editedTask: Task = new Task('','','','','');
  formSubmitted = false;



  constructor(private taskListService: TaskListService, @Inject(MAT_DIALOG_DATA) private data:any ){
      // console.log(this.taskListService.getTask(this.data.id))
      console.log(this.data.id)


  }



  ngOnInit(): void {

    if(this.data.id !== undefined){
      this.id = this.data.id
      this.editedTask = this.taskListService.getTask(this.id)
      this.isEditMode= true;
    }else{
      this.isEditMode = false
    }
  }


  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    this.task = { ...form.value };
    console.log(this.task)

    if (this.isEditMode) {
      this.taskListService.updateTask(this.id, this.task);
    } else {
      this.taskListService.saveTask(this.task);
      form.reset({
      });
    }
    this.isEditMode = false
  }
}
