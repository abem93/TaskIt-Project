import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog'
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProfileComponent } from './shared/sidebar/profile/profile.component';
import { DeleteModalComponent } from './task-list/delete-modal/delete-modal.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NewTaskComponent } from './shared/new-task/new-task.component';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { AppRoutingModule } from './app-routing.module';
import { MainViewComponent } from './shared/main-view/main-view.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { BoredComponent } from './bored/bored.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DetailedViewComponent } from './shared/detailed-view/detailed-view.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptor } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProfileComponent,
    DeleteModalComponent,
    TaskListComponent,
    NewTaskComponent,
    LandingPageComponent,
    SignUpComponent,
    LogInComponent,
    KanbanBoardComponent,
    MainViewComponent,
    NotificationsComponent,
    BoredComponent,
    DetailedViewComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CdkDropListGroup,
    CdkDropList,
    NgFor,
    CdkDrag,
    HttpClientModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
