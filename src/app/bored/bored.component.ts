import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../shared/new-task/new-task.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bored',
  templateUrl: './bored.component.html',
  styleUrls: ['./bored.component.css']
})
export class BoredComponent {
  boredTask:string = null;

  constructor(private dialog: MatDialog, private http: HttpClient){}

  generateTask(){
    this.http.get<any>('https://www.boredapi.com/api/activity').subscribe(data =>{
      this.boredTask = data.activity
    })
  }

  addTask(){
    const dialogRef = this.dialog.open(NewTaskComponent, {
      height: '32.25em',
      width: '68.125em',
      data: {
        bored: this.boredTask
      }
    });
  }
}
