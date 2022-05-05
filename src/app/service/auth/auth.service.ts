import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/role/Role';
import { LoginResponse } from 'src/app/dto/loginResponse/login-response';
import { User } from 'src/app/model/user/user';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiUrl + '/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private httpClient: HttpClient, private router: Router) {
    let userJsonData = localStorage.getItem('userData');
    if (userJsonData) {
      let parsedUserData =  JSON.parse(userJsonData);
      Object.setPrototypeOf(parsedUserData, User.prototype)
      this.userData = new BehaviorSubject<User | null>(parsedUserData);
    } else {
      this.userData = new BehaviorSubject<User | null>(null);
    }

    this.currentUser = this.userData.asObservable();
    console.log("AuthService initialized. Current user: ", this.userData.value)
  }

  login(username: string, password:string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(AUTH_API + '/login', {username, password}).pipe(
      tap((response => this.onLogin(response))),
      catchError(this.handleError)
    )
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(AUTH_API + '/register', {username, email, password}).pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('userData');
    this.userData.next(null);
    // this.role.next(null);

    this.router.navigate(['login']);
  }

  public get user(): User | null {
    return this.userData.value;
  }

  private onLogin(authResult: LoginResponse): void {
    console.log("!!login!!");
    let userRole = authResult.roles[0] as Role
    let newUser = new User(
      authResult.id, 
      authResult.username, 
      authResult.email, 
      authResult.token, 
      userRole
    );
    localStorage.setItem('userData', JSON.stringify(newUser));
    this.userData.next(newUser)
  }

  private handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }
}
