import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription;
  userIsAuth = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuth =this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.userIsAuth = isAuth;
    });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  logoutUser() {
    this.authService.logoutUser();

  }


}
