import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emitter/emitters';
import { Role } from '../../model/role/Role';
import { User } from '../../model/user/user';

import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authenticated = false;
  isAdmin = false;
  isUser = false;
  isModerator = false;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.updateUserData(this.authService.user);
    this.authService.currentUser.subscribe(
      (userData: User | null) => {
        this.updateUserData(userData)
      }
    )
  }

  logout(): void {
    this.authenticated = false;
    this.isAdmin = false;
    this.isUser = false;
    this.isModerator = false;
    this.authService.logout();
  }

  private updateUserData(userData: User | null) {
    console.log("Updating user data: ", userData);
    this.authenticated = userData != null
    this.isAdmin = userData?.isAdmin ?? false
    this.isUser = userData?.isUser ?? false
    this.isModerator = userData?.isModerator ?? false
  }

}
