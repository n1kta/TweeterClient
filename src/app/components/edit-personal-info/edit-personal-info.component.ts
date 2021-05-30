import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFormBuilder } from 'src/app/helpers/baseFormBuilder';
import { RegistrationConstant } from 'src/app/helpers/constants/registration.constant';
import { User } from 'src/app/models/user.model';
import { UserProfile } from 'src/app/models/userProfile.model';
import { UserProfileService } from 'src/app/services/userProfile.service';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.css']
})
export class EditPersonalInfoComponent extends BaseFormBuilder implements OnInit {
  private fb: FormBuilder;
  public editForm: FormGroup;

  currentUserInfo: User;
  model: UserProfile = {
    id: null,
    fullName: null,
    bio: null,
    photo: null,
    phone: null
  };

  constructor(private _fb: FormBuilder,
    private router: Router,
    private userProfileService: UserProfileService) {
    super(_fb);
    this.fb = _fb;
  }

  ngOnInit(): void {
    this.setUp();
  }

  onGetCurrentUser(event) {
    this.currentUserInfo = event;
  }

  setUp(): void {
    this.editForm = this.fb.group({
      fullName: new FormControl('', [Validators.minLength(RegistrationConstant.MIN_USERNAME_LENGTH)]),
      bio: new FormControl('', []),
      phone: new FormControl('', [Validators.pattern(/[0-9]/g)])
    });
  }

  markAsTouch() {
    Object.keys(this.editForm.controls).map(x => this.editForm.controls[x].markAsTouched());
  }

  async submit() {
    this.markAsTouch();
    
    const isValid = Object.keys(this.editForm.controls).every(x => !this.editForm?.controls[x]?.errors);
    
    if (isValid) {
      Object.keys(this.editForm.controls).map(key => this.model[key] = this.editForm.controls[key].value);

      try {
        const reponse = await this.userProfileService.update(this.currentUserInfo.id, this.model);
      } catch (e) {
        console.error(e);
      }
    }
  }

  hasUnsavedData(): boolean {
    throw new Error('Method not implemented.');
  }

  moveBack() {
    this.router.navigate(['user-profile']);
  }
}
