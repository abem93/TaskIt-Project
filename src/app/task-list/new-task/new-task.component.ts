import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  editedTask: Task;
  formSubmitted = false;



  constructor(private taskListService: TaskListService, @Inject(MAT_DIALOG_DATA) private data:any ){
    // console.log(this.taskListService.getTask(this.data.id))

  }



  ngOnInit(): void {
    const editedTask = this.editedTask
    console.log(editedTask)
    if(this.isEditMode){
      this.taskListForm.setValue({
        title: editedTask.title,
        description: editedTask.description,
        date: editedTask.date,
        priority: editedTask.priority,
        status: editedTask.status
      })
    }
  }


  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    this.task = { ...form.value };

    if (this.isEditMode) {

      this.taskListService.updateTask(this.id, this.task);
    } else {
      this.taskListService.saveTask(this.task);

      form.reset({
      });
    }




  }
}
