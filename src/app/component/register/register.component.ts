
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  registerFailed: boolean = false;
  registerFailureDescription!: string;

  constructor(private formBiulder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBiulder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get getName() {
    return this.form.get('username');
  }

  get getEmail() {
    return this.form.get('email');
  }

  get getPassword() {
    return this.form.get('password');
  }

  submit(): void {
    this.registerFailed = false;
    this.http.post('http://localhost:8080/api/register', this.form.getRawValue())
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
    // this.router.navigate(['/login']);
  }
}
