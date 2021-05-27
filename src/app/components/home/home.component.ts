import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFormBuilder } from 'src/app/helpers/baseFormBuilder';
import { UserInfo } from 'src/app/models/userInfo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseFormBuilder implements OnInit {
  private fb: FormBuilder;
  public tweetForm: FormGroup;

  currentUserInfo: UserInfo;

  constructor(private _fb: FormBuilder,
    private router: Router) {
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
    this.tweetForm = this.fb.group({
      tweet: new FormControl('', [Validators.required])
    })
  }

  markAsTouch(): void {
    throw new Error('Method not implemented.');
  }
  submit(): void {
    throw new Error('Method not implemented.');
  }
  hasUnsavedData(): boolean {
    throw new Error('Method not implemented.');
  }
}
