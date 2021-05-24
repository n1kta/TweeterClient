import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/userInfo.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userInfo: UserInfo;

  @Input()
  isSettingsPage: boolean = false;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.userInfo = await this.userService.getCurrentUser() as UserInfo;
  }

}
