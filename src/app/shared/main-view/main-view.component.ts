import { Component, OnInit, } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(private httpService: HttpService){}

  ngOnInit(){
     this.httpService.fetchTasksFromFirebase()
}

}
