import { NgModule } from '@angular/core';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'main', component: ProfileMainComponent },
  { path: 'edit', component: ProfileEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  declarations: [ProfileMainComponent, ProfileEditComponent],
})
export class ProfileModule {}
