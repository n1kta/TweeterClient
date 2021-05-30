import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEventPattern, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/auth/login.model';
import { Registration } from '../models/auth/registration.model';
import { TokenUser } from '../models/tokenUser.model';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = `${environment.apiUrl}/auth`;
  private currentUserSource = new ReplaySubject<TokenUser>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  public readonly USER = 'user';

  constructor(private http: HttpClient) { }

  public getToken(): string {
    const token = JSON.parse(localStorage.getItem(this.USER))?.token;
    return token;
  }

  public setToken(user: TokenUser) {
    localStorage.setItem(this.USER, JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  public isAuthenticated(): boolean {
    const isTokenExist = this.getToken();
    return !!isTokenExist;
  }

  public registration(model: Registration) {
    const url = `${this.baseUrl}/registration`;
    return this.http.post(url, model).toPromise();
  }

  public login(model: Login) {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, model).toPromise();
  }

  public logout() {
    localStorage.removeItem(this.USER);
    this.currentUserSource.next(null);
  }
}
