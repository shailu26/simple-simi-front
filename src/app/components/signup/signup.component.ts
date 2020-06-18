import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  constructor(private http: HttpClient) {}

  ngOnInit() {}
  signUp() {
    this.http
      .post(`${environment.baseUrl}/api/user/createUser`, {
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .toPromise();
  }
}
