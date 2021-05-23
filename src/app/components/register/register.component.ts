import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultModel } from 'src/app/helpers/models/result.model';
import { BaseFormBuilder } from '../../helpers/baseFormBuilder';
import { RegistrationConstant } from '../../helpers/constants/registration.constant';
import { ValidatePassowrds } from '../../helpers/validators/validatePassword';
import { Registration } from '../../models/auth/registration.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseFormBuilder implements OnInit {
  private fb: FormBuilder;
  public registartionForm: FormGroup;

  public model: Registration = {
    userName: null,
    email: null,
    password: null,
    repeatPassword: null
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
    this.registartionForm = this.fb.group({
      userName: new FormControl('', [Validators.required,
      Validators.minLength(RegistrationConstant.MIN_USERNAME_LENGTH)]),
      email: new FormControl('', [Validators.required,
      Validators.email]),
      password: new FormControl('', [Validators.required,
      Validators.minLength(RegistrationConstant.MIN_PASSWORD_LENGTH),
      Validators.maxLength(RegistrationConstant.MAX_PASSWORD_LENGTH)]),
      repeatPassword: new FormControl('', [Validators.required])
    }, {
      validator: ValidatePassowrds('password', 'repeatPassword')
    });
  }

  markAsTouch(): void {
    Object.keys(this.registartionForm.controls).map(x => this.registartionForm.controls[x].markAsTouched());
  }

  async submit() {
    this.markAsTouch();

    const isValid = Object.keys(this.registartionForm.controls).every(x => !!this.registartionForm?.controls[x]?.value);

    if (isValid) {
      Object.keys(this.registartionForm.controls).map(key => this.model[key] = this.registartionForm.controls[key].value);
      
      try {
        const response = await this.authService.registration(this.model) as ResultModel;
        
        if (response.isSuccess) {
          this.router.navigate(['login']);
        } else {
          // modal window with error
        }

      } catch (e) {
        console.error(e);
      }
    }
  }
}
