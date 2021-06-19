import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFormBuilder } from 'src/app/helpers/baseFormBuilder';
import { ResultModel } from 'src/app/helpers/models/result.model';
import { Tweet } from 'src/app/models/tweet.model';
import { User } from 'src/app/models/user.model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseFormBuilder implements OnInit {
  private fb: FormBuilder;
  public tweetForm: FormGroup;

  currentUserInfo: User;

  imageBase64: any;

  model: Tweet = {
    id: null,
    description: null,
    photo: null,
    userProfile: null,
    userName: null,
    likes: null,
    isLiked: null
  };

  constructor(private _fb: FormBuilder,
    private router: Router,
    private tweetService: TweetService) {
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
      description: new FormControl('', [Validators.required])
    })
  }

  markAsTouch(): void {
    Object.keys(this.tweetForm.controls).map(x => this.tweetForm.controls[x].markAsTouched());
  }

  async submit() {
    this.markAsTouch();

    const isValid = Object.keys(this.tweetForm.controls).every(x => !!this.tweetForm?.controls[x]?.value);

    if (isValid) {
      Object.keys(this.tweetForm.controls).map(key => this.model[key] = this.tweetForm.controls[key].value);
      this.model.userName = this.currentUserInfo.userName;
      this.model.photo = this.imageBase64.split(',')[1] ?? null;

      try {
        const response = await this.tweetService.create(this.currentUserInfo.id, this.model) as ResultModel;

        if (response.isSuccess) {
          this.tweetForm.reset();
        } else {
          // modal window with error
        }

      } catch (e) {
        console.error(e);
      }
    }
  }

  hasUnsavedData(): boolean {
    throw new Error('Method not implemented.');
  }

  async getFile(event: any) {
    if (event.length === 0) {
      return;
    }

    const file: File = event.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = async (e) => {
      this.imageBase64 = await reader.result;
    };

    reader.readAsDataURL(file);
  }
}
