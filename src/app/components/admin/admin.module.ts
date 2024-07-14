import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { EventsComponent } from './events/events.component';
import { ClassesComponent } from './classes/classes.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'users', component: UsersComponent },
  { path: 'events', component: EventsComponent },
  { path: 'classes', component: ClassesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  declarations: [
    AdminComponent,
    UsersComponent,
    EventsComponent,
    ClassesComponent,
  ],
})
export class AdminModule {}
