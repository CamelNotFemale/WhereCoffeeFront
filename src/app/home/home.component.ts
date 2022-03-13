import { EmitterVisitorContext } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitter/emitters';
import { User } from '../model/user';
import { AuthService } from '../service/auth/auth.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = '';

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.userService.getData(this.authService.userId!).subscribe(
        (userData: User) => {
          this.message = `Hi ${userData.name}`;
        },
        (err: any) => {
          this.message = 'Failed to fetch user data';
        }
      )
    } else {
      this.message = 'You are not logged in';
    }
  }

}
