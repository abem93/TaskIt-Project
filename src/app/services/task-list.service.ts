import { Injectable } from '@angular/core';
import { Task } from '../task-list/task.model';
import { Subject } from 'rxjs';
import { Notification } from '../shared/notifications/notification.model';


@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  taskSelected = new Subject<Task>();
  taskListChanged = new Subject<Task[]>();
  startedEditing = new Subject<number>();
  notificationSubject = new Subject<Notification>();

  constructor(){}

  private tasks: Task[] = []

  saveTask(task: Task) {
    this.tasks.push(task);
    this.taskListChanged.next(this.getTasks());
    this.notificationSubject.next(new Notification('New Task Created', task))
  }

  getTask(id: number) {
      return this.tasks[id];
  }
  
  getTasks() {
    return [...this.tasks];
  }

  findTask(task: Task) {
    return this.tasks.indexOf(task);
  }

  selectTask(task: Task) {
    this.taskSelected.next(task);
  }

  removeTask(id: number) {
    this.notificationSubject.next(new Notification('Task Deleted', this.tasks[id]))
    this.tasks.splice(id, 1);
    this.taskListChanged.next(this.getTasks());

  }

  setTasks(tasks: Task[]){
    this.tasks = tasks;
    this.taskListChanged.next(this.tasks.slice())
  }

  updateTask(index: number, updatedTask) {
    this.tasks[index] = updatedTask;
    this.taskListChanged.next(this.getTasks());
    this.notificationSubject.next(new Notification('Task Updated', updatedTask))
  }
}

