import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  private jwtHelper = new JwtHelperService();
  constructor(public router: Router) {}
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['login']);
      return false;
    }
    console.log('dsdasdas');
    return true;
  }
}
