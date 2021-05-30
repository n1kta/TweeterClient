import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  getViewProfileByUserName(userName: string) {
    return this.http.get(`${this.baseUrl}/getViewProfile/${userName}`).toPromise();
  }
}
