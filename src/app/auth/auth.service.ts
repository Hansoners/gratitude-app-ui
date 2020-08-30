import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private isAuth = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post('http://localhost:3000/api/user/register', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ token: string }>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {
          this.isAuth = true;
          this.authStatusListener.next(true);
        }
      });
  }

  logoutUser() {
    this.token = null;
    this.isAuth = false;
    this.authStatusListener.next(false);
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

}
