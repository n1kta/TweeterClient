import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  currentUserInfo: User;

  constructor(private router: Router) { }

  async ngOnInit() {
  }

  public editUserProfile() {
    this.router.navigate(['edit-user-profile']);
  }

  onGetCurrentUser(event) {
    this.currentUserInfo = event;
  }
}
