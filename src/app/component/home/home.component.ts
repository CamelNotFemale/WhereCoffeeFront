import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private router: Router,
    private userService: UserService, 
    private authService: AuthService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.user) {
      console.log("home")
      this.userService.getData(this.authService.user.id!).subscribe(
        (userData: User) => {
          this.message = `Привет, ${userData.username} !`;
          this.isLoggedIn = true;
        },
        (err: any) => {
          this.toastr.error('Время действия сессии истекло. Необохдимо заново авторизироваться', 'Ошибка')
          this.isLoggedIn = false;
          this.router.navigate(['/login']);
        }
      )
    } else {
      this.message = 'Привет, Гость!';
      this.isLoggedIn = false;
    }
  }

}
