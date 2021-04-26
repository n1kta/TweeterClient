import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormBuilder } from '../helpers/baseFormBuilder';
import { RegistrationConstant } from '../helpers/constants/registration.constant';
import { ValidatePassowrds } from '../helpers/validators/validatePassword';
import { Registration } from '../models/auth/registration.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseFormBuilder implements OnInit {
  private fb: FormBuilder;
  public registartionForm: FormGroup;

  public model: Registration = {
    username: null,
    email: null,
    password: null,
    repeatPassword: null
  };

  constructor(private _fb: FormBuilder) {
    super(_fb);
    this.fb = _fb;
  }

  ngOnInit(): void {
    this.setUp();
  }

  setUp(): void {
    this.registartionForm = this.fb.group({
      username: new FormControl('', [Validators.required,
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

  submit(): void {
    this.markAsTouch();

    const isValid = Object.keys(this.registartionForm.controls).every(x => !!this.registartionForm?.controls[x]?.value);

    if (isValid) {
      Object.keys(this.registartionForm.controls).map(key => this.model[key] = this.registartionForm.controls[key].value);
    }
  }
}
