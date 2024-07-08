import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Task } from '../task-list/task.model';
import { TaskListService } from '../services/task-list.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpService } from '../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailedViewComponent } from '../shared/detailed-view/detailed-view.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
})
export class KanbanBoardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  userData: any;
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  dataLoaded = false;

  constructor(
    private tasklistService: TaskListService,
    private dialog: MatDialog,
    private httpService: HttpService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.auth.currentUser.subscribe(
        data => {
          this.userData = data;
          this.loadTasks();
        },
        error => console.error('Error fetching user data:', error)
      )
    );

    this.subscriptions.push(
      this.tasklistService.taskListChanged.subscribe((tasks: Task[]) => {
        this.categorizeTasks(tasks);
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadTasks(): void {
    if (!this.userData) return;

    const tasks = this.tasklistService.getTasks();
    this.categorizeTasks(tasks);
    this.dataLoaded = true;
    this.cdr.detectChanges();
  }

  categorizeTasks(tasks: Task[]): void {
    this.todoTasks = tasks.filter(task => task.status === 'To Do');
    this.inProgressTasks = tasks.filter(task => task.status === 'In Progress');
    this.doneTasks = tasks.filter(task => task.status === 'Done' || !task.status);
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      const newStatus = this.getStatusFromContainerId(event.container.id);
      this.statusChange(task, { target: { value: newStatus } });
    }
  }

  getStatusFromContainerId(id: string): string {
    switch (id) {
      case 'cdk-drop-list-0': return 'To Do';
      case 'cdk-drop-list-1': return 'In Progress';
      case 'cdk-drop-list-2': return 'Done';
      default: return 'To Do';
    }
  }

  priorityChange(event: any, task: Task): void {
    task.priority = event.target.value;
    this.updateTask(task);
  }

  statusChange(task: Task, event: any): void {
    task.status = event.target.value;
    this.updateTask(task);
    this.categorizeTasks(this.tasklistService.getTasks());
  }

  updateTask(task: Task): void {
    task.list = task.list || 'tasks';
    const id = this.tasklistService.findTask(task);
    this.tasklistService.updateTask(id, task);
    this.httpService.saveTasksToFirebase(this.userData, task.list);
  }

  onView(index: number): void {
    let task: Task;
    let id: number;

    if (this.todoTasks[index]) {
      task = this.todoTasks[index];
      id = this.tasklistService.findTask(task);
    } else if (this.inProgressTasks[index]) {
      task = this.inProgressTasks[index];
      id = this.tasklistService.findTask(task);
    } else if (this.doneTasks[index]) {
      task = this.doneTasks[index];
      id = this.tasklistService.findTask(task);
    } else {
      return;
    }

    this.dialog.open(DetailedViewComponent, {
      height: '30em',
      width: '50em',
      data: { id: id }
    });
  }
}