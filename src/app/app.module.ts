import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProfileComponent } from './shared/sidebar/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TaskListComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
