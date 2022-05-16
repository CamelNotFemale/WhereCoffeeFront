
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  registerFailed: boolean = false;
  registerFailureDescription!: string;
  hide: Boolean = false;
  showEye: Boolean = false;

  constructor(private formBiulder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBiulder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.pattern("[0-9a-zA-Z!@#$%^&*]{6,}")]]
    })
  }

  // get username() {
  //   return this.form.get('username');
  // }

  // get email() {
  //   return this.form.get('email');
  // }

  // get password() {
  //   return this.form.get('password');
  // }

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit(): void {
    this.registerFailed = false;
    if (!this.form.valid) {
      this.registerFailed = true;
      this.registerFailureDescription = 'Ошибка при регистрации';
    }
    else {
      this.http.post(environment.apiUrl + '/api/register', this.form.getRawValue())
      .subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        (err: any) => {
          console.log(err);
          this.registerFailed = true;
          this.registerFailureDescription = err.error['message'];
        }
      )
    }
  }

  showPassword() {
    this.hide = !this.hide;
    this.showEye = !this.showEye;
  } 
}
