import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TweetsComponent } from './components/tweets/tweets.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { EditPersonalInfoComponent } from './components/edit-personal-info/edit-personal-info.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    TweetsComponent,
    CommentsComponent,
    PersonalInfoComponent,
    EditPersonalInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
