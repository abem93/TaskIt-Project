import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  taskSelected = new Subject<Task>();
  taskListChanged = new Subject<Task[]>();
  startedEditing = new Subject<number>();
  notificationSubject = new Subject<Notification>();


  private tasks: Task[] = [
    new Task(
      'Run',
      '',
      '8/25/2024',
      'Low',
      'To Do'
    ),
    new Task(
      'Homework',
      '',
      '9/2/2026',
      'Medium',
      'In Progress'
    ),
    new Task(
      'Gym',
      '',
      '12/25/2023',
      'High',
      'Done'
    )
  ]

  saveTask(task: Task) {
    this.tasks.push(task);
    this.taskListChanged.next(this.getTasks());
    this.notificationSubject.next(new Notification('New Task Created', task))
  }

  getTask(id: number) {
    return this.tasks[id];
  }

  selectTask(task: Task) {
    this.taskSelected.next(task);
  }

  removeTask(id: number) {
    this.notificationSubject.next(new Notification('Task Deleted', this.tasks[id]))
    this.tasks.splice(id, 1);
    this.taskListChanged.next(this.getTasks());

  }

  getTasks() {
    return [...this.tasks];
  }

  updateTask(index: number, updatedTask) {
    this.tasks[index] = updatedTask;
    this.taskListChanged.next(this.getTasks());
    this.notificationSubject.next(new Notification('Task Updated', updatedTask))
  }
}

