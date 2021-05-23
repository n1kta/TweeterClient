import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFormBuilder } from 'src/app/helpers/baseFormBuilder';
import { RegistrationConstant } from 'src/app/helpers/constants/registration.constant';
import { Login } from 'src/app/models/auth/login.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseFormBuilder implements OnInit {
  private fb: FormBuilder;
  public loginForm: FormGroup;

  model: Login = {
    userName: null,
    password: null
  };

  constructor(private _fb: FormBuilder,
              private router: Router,
              private authService: AuthService
    ) {
    super(_fb);
    this.fb = _fb;
  }

  ngOnInit(): void {
    this.setUp();
  }

  setUp(): void {
    this.loginForm = this.fb.group({
      userName: new FormControl('', [Validators.required,
                                    Validators.minLength(RegistrationConstant.MIN_USERNAME_LENGTH)]),
      password: new FormControl('', [Validators.required,
                                    Validators.minLength(RegistrationConstant.MIN_PASSWORD_LENGTH),
                                    Validators.maxLength(RegistrationConstant.MAX_PASSWORD_LENGTH)]),
    });
  }

  markAsTouch(): void {
    Object.keys(this.loginForm.controls).map(x => this.loginForm.controls[x].markAsTouched());
  }

  async submit() {
    this.markAsTouch();

    const isValid = Object.keys(this.loginForm.controls).every(x => !!this.loginForm?.controls[x]?.value);
    
    if (isValid) {
      Object.keys(this.loginForm.controls).map(key => this.model[key] = this.loginForm.controls[key].value);

      try {
        const reponse = await this.authService.login(this.model) as User;
        
        if (reponse?.token) {
          this.authService.setToken(reponse);
          this.router.navigate(['home']);
        } else {
          // modal window with error
        }

      } catch (e) {
        console.error(e);
      }
    }
  }

}