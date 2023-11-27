import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { TaskListService } from 'src/app/services/task-list.service';
import { Task } from 'src/app/task-list/task.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(private httpService: HttpService){}

  ngOnInit(): void {
    this.httpService.fetchTasksFromFirebase();
  }
}
