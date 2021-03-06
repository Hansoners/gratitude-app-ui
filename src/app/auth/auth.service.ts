import { MessageService, ConfirmationService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private isAuth = false;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(BACKEND_URL + 'register', authData)
      .subscribe(response => {
        this.loginUser(email, password);
      }, error => {
        this.authStatusListener.next(false);
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Registration failed.' });
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + 'login', authData)
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuth = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expiration = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(this.token, expiration, this.userId);
          this.router.navigate(['/app']);
          this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'You\'re logged in!' });
        }
      }, error => {
        this.authStatusListener.next(false);
        this.messageService.add({ severity: 'error', summary: 'Login Failed!', detail: 'Please check your account information.' });
      });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuth = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  logoutUser() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to log out?',
      accept: () => {
        this.token = null;
        this.isAuth = false;
        this.userId = null;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'You\'ve logged out.' });
      }
    });
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getUserId() {
    return this.userId;
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expiration || !userId) {
      return;
    }
    return {
      token: token, expiration: new Date(expiration), userId: userId
    };
  }

}
