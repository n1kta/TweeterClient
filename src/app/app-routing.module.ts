import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { EditPersonalInfoComponent } from './components/edit-personal-info/edit-personal-info.component';

const routes: Routes = [
  { path: 'registration', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile', component: PersonalInfoComponent },
  { path: 'edit-user-profile', component: EditPersonalInfoComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
