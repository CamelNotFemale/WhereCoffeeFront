import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitter/emitters';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authenticated = false;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authenticated = this.authService.isLoggedIn;
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }

  logout(): void {

    // this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
    //   .subscribe(() => this.authenticated = false);
    this.authenticated = false;
    this.authService.logout();
  }

}
