import { Component, OnInit } from '@angular/core';
import { Task } from '../task-list/task.model';
import { TaskListService } from '../services/task-list.service';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpService } from '../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailedViewComponent } from '../shared/detailed-view/detailed-view.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
})
export class KanbanBoardComponent implements OnInit{
  authSub: Subscription;
  userData;
  id:number;
  task: Task;
  tasks: Task[];
todo: any;

  constructor(private tasklistService:TaskListService,private dialog: MatDialog, private httpService: HttpService, private auth: AuthService){}

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngOnInit(): void {
    this.tasks = this.tasklistService.getTasks();
    this.tasklistService.taskListChanged.subscribe((tasks) => this.tasks = tasks);
    this.authSub = this.auth.currentUser.subscribe(data =>{
      this.userData = data
    })
  }
  priorityChange(event: any, id: number){
    this.id = id
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.priority = inputValue
    this.tasklistService.updateTask(this.id, this.task);
    this.httpService.saveTasksToFirebase(this.userData);
  }

  statusChange(event: any, id: number){
    this.id = id
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.status = inputValue
    this.tasklistService.updateTask(this.id, this.task);
    this.httpService.saveTasksToFirebase(this.userData);
  }
  onView(id:number){
    const dialogRef = this.dialog.open(DetailedViewComponent, {
      height: '30em',
      width: '50em',
      data: {
        id: id
      }
    });
}
}
