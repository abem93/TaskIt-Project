import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { TaskListService } from "./task-list.service";
import { Task } from "../task-list/task.model";
import { environment } from "src/environments/enviroment";

import { Subject} from "rxjs";

const FIREBASE_URL = environment.firebaseUrl;

@Injectable({
  providedIn: 'root',
})
export class HttpService implements OnInit{
  userProfile = new Subject<any>();
  constructor(
    private tasklistService: TaskListService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {

  }



  saveTasksToFirebase(userData, listName?: string) {
    const myTasks = this.tasklistService.getTasks();
    listName = listName ? listName : 'tasks';

    this.http.put(FIREBASE_URL+ 'users/' + userData.id + '/' + listName + '.json', myTasks).subscribe((data) => {
      
    });
  }

  
  // fetch list from Firebase - REQUEST
  fetchTasksFromFirebase(data, listName?: string) {
    listName = listName ? listName : 'tasks';

    this.http.get<Task[]>(FIREBASE_URL+ 'users/' + data.id + '/' + listName + '.json',).subscribe((data) => {
      // console.log('DATA from FB: ', data);
      this.tasklistService.setTasks(data ?? []);
    });
  }

  //Fetch Lists
  fetchListsFromFirebase(data) {
    this.http.get<Task[]>(FIREBASE_URL+ 'users/' + data.id + '.json',).subscribe((data) => {
      console.log('DATA from FB: ', data);
      // this.tasklistService.setTasks(data ?? []);
    });
  }


  // fetch User
  fetchUserFromFirebase(data) {
    this.http.get(FIREBASE_URL+ 'users/' + data.id + '/profile.json').subscribe((data) => {
      this.userProfile.next(data)
    });

  }
}


