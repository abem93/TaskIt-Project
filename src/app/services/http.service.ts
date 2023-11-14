import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TaskListService } from "./task-list.service";
import { Task } from "../task-list/task.model";
import { environment } from "src/environments/enviroment";

const FIREBASE_URL = environment.firebaseUrl;

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private tasklistService: TaskListService,
    private http: HttpClient
  ) {}

  // * Methods

  saveBooksToFirebase() {
    const myTasks = this.tasklistService.getTasks();

    this.http.put(FIREBASE_URL, myTasks).subscribe((data) => {
      console.log(data);
    });
  }

  // fetch data from Firebase - REQUEST
  fetchBooksFromFirebase() {
    this.http.get<Task[]>(FIREBASE_URL).subscribe((data) => {
      console.log('DATA from FB: ', data);
      this.tasklistService.setTasks(data ?? []);
    });
  }
}
