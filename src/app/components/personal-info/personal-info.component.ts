import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public editUserProfile() {
    this.router.navigate(['edit-user-profile']);
  }

}
