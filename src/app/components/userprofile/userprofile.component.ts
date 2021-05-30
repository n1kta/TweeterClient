import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ViewProfile } from 'src/app/models/viewProfile.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  currentUserInfo: User;
  user: ViewProfile;

  constructor(private activatedRouter: ActivatedRoute,
    private userService: UserService) { }

  async ngOnInit() {
    this.activatedRouter.params.subscribe(async param => {
      const name = param.username;
      this.user = await this.userService.getViewProfileByUserName(name) as ViewProfile;
    });
  }

  onGetCurrentUser(event) {
    this.currentUserInfo = event;
  }

  isCurrentUserProfile(): boolean {
    return this.currentUserInfo.id === this.user.id;
  }
}
