import { Component, OnInit } from '@angular/core';
import { Task } from '../task-list/task.model';
import { TaskListService } from '../task-list/task-list.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit{
  tasks: Task[];

  constructor(private tasklistService:TaskListService){}

  ngOnInit(): void {
    this.tasks = this.tasklistService.getTasks();
    this.tasklistService.taskListChanged.subscribe((tasks) => this.tasks = tasks)
  }
  statusChange(event, task){
    // console.log(event, task)
  }
  priorityChange(){

  }
}
