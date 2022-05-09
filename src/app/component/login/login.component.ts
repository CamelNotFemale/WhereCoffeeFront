import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../../dto/loginResponse/login-response';
import { AuthService } from '../../service/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  loginFailed: boolean = false;
  loginFailureDescription!: string;
  hide: Boolean = false;
  showEye: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  submit(): void {
    this.loginFailed = false;
    let username = this.form.get('username')?.value
    let password = this.form.get('password')?.value
    this.authService.login(username, password).subscribe(
      (authResult: LoginResponse) => {
        console.log(authResult);
        this.router.navigate(['/home']);
      },
      (err: any) => {
        console.log(err);
        this.loginFailed = true;
        this.loginFailureDescription = 'Unable to sign in!';
      }
      )
  }

  showPassword() {
    this.hide = !this.hide;
    this.showEye = !this.showEye;
  } 

}
