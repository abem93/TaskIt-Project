import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TaskListService } from "./task-list.service";
import { Task } from "../task-list/task.model";
import { environment } from "src/environments/enviroment";
import { BehaviorSubject, Subject } from "rxjs";

import { AuthService } from "../auth/auth.service";

import { AuthService } from "../auth/auth.service";

const FIREBASE_URL = environment.firebaseUrl;

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  userData = this.auth.currentUser.value


  constructor(
    private tasklistService: TaskListService,
    private http: HttpClient,
    private auth: AuthService
  ) {

  }

  // * Methods

  saveTasksToFirebase() {
    const myTasks = this.tasklistService.getTasks();

    this.http.put(FIREBASE_URL+ 'users/' + this.userData.id + '/tasks.json', myTasks).subscribe((data) => {
      console.log(data);
    });
  }

  // fetch data from Firebase - REQUEST
  fetchTasksFromFirebase() {
    this.http.get<Task[]>(FIREBASE_URL+ 'users/' + this.userData.id + '/tasks.json').subscribe((data) => {
      console.log('DATA from FB: ', data);
      this.tasklistService.setTasks(data ?? []);
    });
  }

  // fetch User
  fetchUserFromFirebase(data) {
    this.http.get(FIREBASE_URL+ 'users/' + data.localId + '/profile.json').subscribe((data) => {
      console.log(data)
      localStorage.setItem('userProfile', JSON.stringify(data))
    });
  }
}


