import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../models/userInfo.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = `${environment.apiUrl}/user`;
  
  constructor(private http: HttpClient) {
  }

  public getCurrentUser(){
      return this.http.get(`${this.baseUrl}/currentUser`).toPromise();
  }
}
