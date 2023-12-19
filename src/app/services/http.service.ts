import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { TaskListService } from "./task-list.service";
import { Task } from "../task-list/task.model";
import { environment } from "src/environments/enviroment";

import { AuthService } from "../auth/auth.service";
import { Subject, Subscription } from "rxjs";

const FIREBASE_URL = environment.firebaseUrl;

@Injectable({
  providedIn: 'root',
})
export class HttpService implements OnInit{
  userProfile = new Subject<any>();
  userData;
  authSub: Subscription;


  constructor(
    private tasklistService: TaskListService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
      this.authSub = this.auth.currentUser.subscribe(data =>{
        this.userData = data
      })
  }

  // * Methods

  saveTasksToFirebase() {
    const myTasks = this.tasklistService.getTasks();

    this.http.put(FIREBASE_URL+ 'users/' + this.userData.id + '/tasks.json', myTasks).subscribe((data) => {
      // console.log(data);
    });
  }

  // fetch data from Firebase - REQUEST
  fetchTasksFromFirebase(data) {

    this.http.get<Task[]>(FIREBASE_URL+ 'users/' + data.id + '/tasks.json').subscribe((data) => {
      // console.log('DATA from FB: ', data);
      this.tasklistService.setTasks(data ?? []);
    });
  }

  // fetch User
  fetchUserFromFirebase(data) {
    this.http.get(FIREBASE_URL+ 'users/' + data.id + '/profile.json').subscribe((data) => {
      this.userProfile.next(data)
    });

  }
}


