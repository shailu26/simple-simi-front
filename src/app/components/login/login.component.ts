import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    console.log('here');
    // this.http.get(`http://localhost:8001/auth/google`).toPromise();
  }
  async signIn() {
    console.log('dsadadada');
    let result: any = await this.http
      .post(`http://localhost:8001/api/user/login`, { email: this.email, password: this.password })
      .toPromise();
    console.log({ result });
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
    this.router.navigate(['home']);
  }
  signUp() {
    console.log('sinffsdfns');
    this.router.navigate(['signup']);
  }
}
