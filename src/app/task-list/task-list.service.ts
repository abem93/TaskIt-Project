import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  taskSelected = new Subject<Task>();
  taskListChanged = new Subject<Task[]>();
  startedEditing = new Subject<number>();
  private tasks: Task[] = [
    new Task(
      'Run',
      '',
      '8/25/2024',
      'Low',
      'Not Started'
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
      'Completed'
    )
  ]

  saveTask(task: Task) {
    this.tasks.push(task);
    this.taskListChanged.next(this.getTasks());
  }

  getTask(id: number) {
    return this.tasks[id];
  }

  selectTask(task: Task) {
    this.taskSelected.next(task);
  }

  removeTask(id: number) {
    this.tasks.splice(id, 1);
    this.taskListChanged.next(this.getTasks());
  }

  getTasks() {
    return [...this.tasks];
  }

  updateTask(index: number, updatedTask) {
    this.tasks[index] = updatedTask;
    this.taskListChanged.next(this.getTasks());
  }
}

