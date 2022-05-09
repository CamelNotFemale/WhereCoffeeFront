import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user/user';
import { AuthService } from '../../service/auth/auth.service';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = '';
  isLoggedIn: Boolean = false;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.user) {
      console.log("home")
      this.userService.getData(this.authService.user.id!).subscribe(
        (userData: User) => {
          this.message = `Привет, ${userData.username} !`;
          this.isLoggedIn = true;
        },
        (err: any) => {
          this.message = 'Failed to fetch user data';
          this.isLoggedIn = false;
        }
      )
    } else {
      this.message = 'Привет, Гость!';
      this.isLoggedIn = false;
    }
  }

}
