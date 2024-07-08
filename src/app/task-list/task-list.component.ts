import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskListService } from '../services/task-list.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewTaskComponent } from '../shared/new-task/new-task.component';
import { MatDialog } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { HttpService } from '../services/http.service';
import { DetailedViewComponent } from '../shared/detailed-view/detailed-view.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  authSub: Subscription;
  userData;
  @Input() isEditMode: boolean;
  @Input() task: Task;
  @Input() id: number;
  tasks: Task[];
  Math = Math;
  sortBy: string = '';
  sortAsc: boolean = true;
  filters: NgForm;
  clearFilter: boolean = false;
  startDate: Date | null = null;
  endDate: Date | null = null;
  listName: string = 'Tasks'

  constructor(private tasklistService: TaskListService, private dialog: MatDialog, private httpService: HttpService, private auth: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.auth.currentUser.subscribe(data => {
      this.userData = data
    })
    this.tasks = this.tasklistService.getTasks();
    this.tasklistService.taskListChanged.subscribe((tasks) => {
      this.sortTasks(this.sortBy)
      this.tasks = tasks
    });
  }
  openNew(id?: number): void {
    this.id = id
    const dialogRef = this.dialog.open(NewTaskComponent, {
      height: '26em',
      width: '52em',
      data: {
        id: id
      }
    });
  }
  onView(task: Task) {
    const id = this.tasklistService.findTask(task);
    const dialogRef = this.dialog.open(DetailedViewComponent, {
      height: '28em',
      width: '50em',
      data: {
        id: id
      }
    });
  }
  onDelete(task: Task) {
    const id = this.tasklistService.findTask(task);
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      height: '20em',
      width: '50em',
      data: {
        id: id
      }
    });
  }
  onEdit(task: Task) {
    const id = this.tasklistService.findTask(task);
    this.openNew(id);
  }

  sortTasks(sortBy?: string) {
    if (sortBy === this.sortBy) {
      this.sortAsc = !this.sortAsc
    } else {
      this.sortAsc = true
    }
    this.sortBy = sortBy
    const priorityMap = { 'Low': 1, 'Medium': 2, 'High': 3 }
    const statusMap = { 'To Do': 1, 'In Progress': 2, 'Done': 3 }
    this.tasks = this.tasks.sort((a, b) => {
      if (this.sortBy === 'priority') {
        const priorityA = priorityMap[a.priority];
        const priorityB = priorityMap[b.priority];
        if (priorityA < priorityB) {
          return this.sortAsc ? -1 : 1;
        }
        if (priorityA > priorityB) {
          return this.sortAsc ? 1 : -1;
        }
        return 0;
      } else if (this.sortBy === 'status') {
        const statusA = statusMap[a.status];
        const statusB = statusMap[b.status];
        if (statusA < statusB) {
          return this.sortAsc ? -1 : 1;
        }
        if (statusA > statusB) {
          return this.sortAsc ? 1 : -1;
        }
        return 0
      }
      if (a[this.sortBy] < b[this.sortBy]) {
        return this.sortAsc ? -1 : 1;
      }
      if (a[this.sortBy] > b[this.sortBy]) {
        return this.sortAsc ? 1 : -1;
      }
      return 0
    })
  }

  filterTasks(event: any) {
    const filters = event.value

    if (filters.priority === '' && filters.status === '' && !filters.startDate && !filters.endDate) {

      return this.tasks = this.tasklistService.getTasks();
    }
    this.clearFilter = true
    this.tasks = this.tasklistService.getTasks();
    if (filters.priority !== '') {
      this.tasks = this.tasks.filter((task) => {
        return task.priority === filters.priority
      })
    }
    if (filters.status !== '') {
      this.tasks = this.tasks.filter((task) => {
        return task.status === filters.status
      })
    }
    if (filters.startDate !== null && filters.endDate !== null) {
      this.tasks = this.tasks.filter((task) => {
        const date = new Date(task.date)
        return date >= filters.startDate && date <= filters.endDate
      })
    }

  }

  clearFilters() {
    this.clearFilter = false
    this.tasks = this.tasklistService.getTasks();
    this.startDate = null;
    this.endDate = null;
  }

  priorityChange(event: any, task: Task) {
    this.id = this.tasklistService.findTask(task);
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.priority = inputValue
    task.list ? task.list = 'tasks' : task.list = task.list;
    this.tasklistService.updateTask(this.id, this.task);
    this.httpService.saveTasksToFirebase(this.userData, task.list);
  }

  statusChange(event: any, task: Task) {
    this.id = this.tasklistService.findTask(task);
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.status = inputValue
    task.list ? task.list = 'tasks' : task.list = task.list;
    this.tasklistService.updateTask(this.id, this.task);
    this.httpService.saveTasksToFirebase(this.userData, task.list);
  }

  titleChange(event: any, task: Task) {
    this.id = this.tasklistService.findTask(task);
    this.task = this.tasklistService.getTask(this.id);
    const inputValue = event.target.value
    this.task.title = inputValue
    this.tasklistService.updateTask(this.id, this.task);
    task.list ? task.list = 'tasks' : task.list = task.list;
    this.httpService.saveTasksToFirebase(this.userData, task.list);
  }

}
