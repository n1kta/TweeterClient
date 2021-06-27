import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultModel } from 'src/app/helpers/models/result.model';
import { Follow } from 'src/app/models/follow.model';
import { User } from 'src/app/models/user.model';
import { ViewProfile } from 'src/app/models/viewProfile.model';
import { UserService } from 'src/app/services/user.service';
import { UserProfileService } from 'src/app/services/userProfile.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  currentUserInfo: User;
  user: ViewProfile;
  isFollowed: boolean = false;

  constructor(private activatedRouter: ActivatedRoute,
    private userService: UserService,
    private userProfileService: UserProfileService) { }

  async ngOnInit() {
    this.activatedRouter.params.subscribe(async param => {
      const name = param.username;
      this.user = await this.userService.getViewProfileByUserName(name) as ViewProfile;
      await this.howManyFollowerFollowing();
    });
  }

  onGetCurrentUser(event) {
    this.currentUserInfo = event;
  }

  isCurrentUserProfile(): boolean {
    return this.currentUserInfo?.userProfile?.id === this.user?.userProfile?.id;
  }

  async follow() {
    try
    {
      const model: Follow = {
        sourceId: this.currentUserInfo.userProfile.id,
        destinationId: this.user.userProfile.id
      };

      const response = await this.userProfileService.follow(model) as ResultModel;

      if (response.succeeded) {
        await this.howManyFollowerFollowing();
      } else {
        // modal window with error
      }
    } catch (e) {
      console.error(e);
    }
  }

  async howManyFollowerFollowing() {
    const response = await this.userProfileService.howManyFollowerFollowing(this.user.userProfile.id) as any;
    this.user.followers = response.followers;
    this.user.followings = response.followings;
    this.isFollowed = response.isCurrentUserProfileFollowed;
  }

  followState() {

  }
}
