import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/model/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USERS_API_URL = environment.apiUrl + "/users";

  constructor(private httpClient: HttpClient) { }

  getData(userId: number): Observable<User> {
    return this.httpClient.get<User>(this.USERS_API_URL + "/" + userId)
  }
}
