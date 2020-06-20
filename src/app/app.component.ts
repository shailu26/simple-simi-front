import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sim-angular';
  constructor(private router: Router) {}
  onActivate(componentRef) {
    console.log(componentRef);
    this.title = componentRef.title;
    console.log(this.title);
  }

  signOut() {
    localStorage.setItem('token', null);
    this.router.navigate(['login']);
  }
  gotoHome() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['']);
    }
  }
}
