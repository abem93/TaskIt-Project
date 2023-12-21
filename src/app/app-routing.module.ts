import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { TaskListComponent } from './task-list/task-list.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { MainViewComponent } from './shared/main-view/main-view.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { BoredComponent } from './bored/bored.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full' },
  {path: '', component: LandingPageComponent},
  {path: 'register', component: SignUpComponent},
  {path: 'login', component: LogInComponent},
  {
    path: 'tasks', component: MainViewComponent, canActivate: [AuthGuard],
    children:[
      { path: '', redirectTo: '/tasks/list', pathMatch: 'full' },
      { path: 'list', component: TaskListComponent },
      { path: 'kanban', component: KanbanBoardComponent },
      { path: 'bored', component: BoredComponent }
    ]},

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
