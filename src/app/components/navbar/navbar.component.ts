import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userInfo: User;

  @Input()
  isSettingsPage: boolean = false;

  @Output()
  onGetCurrentUser = new EventEmitter<User>();

  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.userInfo = await this.userService.getCurrentUser() as User;

    if (this.userInfo) {
      this.onGetCurrentUser.emit(this.userInfo);
    }
  }

}
