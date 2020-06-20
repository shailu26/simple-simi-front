import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  title = 'login';

  private jwtHelper = new JwtHelperService();
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const queryParamMap: any = this.route.snapshot.queryParamMap;
    console.log(this.route.snapshot.queryParamMap);
    if (queryParamMap.params.hasOwnProperty('token') && !this.jwtHelper.isTokenExpired(queryParamMap.params.token)) {
      localStorage.setItem('token', queryParamMap.params.token);
      this.router.navigate(['home']);
    }
  }
  async signIn() {
    if (this.email.length && this.password.length) {
      try {
        const result: any = await this.http
          .post(`http://localhost:8001/api/user/login`, { email: this.email, password: this.password })
          .toPromise();
        console.log({ result });
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        this.toastr.success('Login Successfull');
        this.router.navigate(['home']);
      } catch (e) {
        this.toastr.error('Something went wrong, Check server is up and running');
      }
    }
  }
  signUp() {
    console.log('sinffsdfns');
    this.router.navigate(['signup']);
  }
  async loginWithGoogle() {
    window.open(`${environment.baseUrl}/auth/google`);
  }
}
