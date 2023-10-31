import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog'
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProfileComponent } from './shared/sidebar/profile/profile.component';
import { DeleteModalComponent } from './task-list/delete-modal/delete-modal.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NewTaskComponent } from './task-list/new-task/new-task.component';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';


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
    KanbanBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
