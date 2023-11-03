import { Component, OnInit } from '@angular/core';
import { Task } from '../task-list/task.model';
import { TaskListService } from '../task-list/task-list.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit{
  id:number;
  task: Task;
  tasks: Task[];

  constructor(private tasklistService:TaskListService){}

  ngOnInit(): void {
    this.tasks = this.tasklistService.getTasks();
    this.tasklistService.taskListChanged.subscribe((tasks) => this.tasks = tasks)
  }
  priorityChange(event: any, id: number){
    this.id = id
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.priority = inputValue
    this.tasklistService.updateTask(this.id, this.task)
  }

  statusChange(event: any, id: number){
    this.id = id
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.status = inputValue
    this.tasklistService.updateTask(this.id, this.task)
  }
}
