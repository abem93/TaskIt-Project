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
import { NonAuthGuard } from './auth/nonAuth.guard';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent, canActivate: [NonAuthGuard],
    children: [
      {path: '', redirectTo: 'tasks', pathMatch: 'full' },
    ]
  },
  {path: 'register', component: SignUpComponent, canActivate: [NonAuthGuard]},
  {path: 'login', component: LogInComponent, canActivate: [NonAuthGuard]},
  {
    path: 'tasks', component: MainViewComponent, canActivate: [AuthGuard],
    children:[
      { path: 'list', component: TaskListComponent },
      { path: 'kanban', component: KanbanBoardComponent },
      { path: 'bored', component: BoredComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'list' }
    ]
  },
  { path: '**', redirectTo: 'tasks' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
