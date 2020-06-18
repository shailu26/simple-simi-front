import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  categories = [];
  categoriesCopy = [];
  content = [];
  contentCopy = [];
  selectedCategory;
  searchText = '';
  ngOnInit() {
    this.getUserDetails();
  }
  async getUserDetails() {
    let user: any = await this.http.get(`${environment.baseUrl}/api/user/getCurrentUser`).toPromise();
    console.log({ user });
    user = user.userDetails[0];
    this.categories = user.category;
    this.content = this.categories[0].content;
    this.contentCopy = JSON.parse(JSON.stringify(this.categories[0].content));
  }

  gotoAddCategory() {
    this.router.navigate(['add-category']);
  }
  gotoAddContent() {
    this.router.navigate(['add-content']);
  }
  onChange(index) {
    this.selectedCategory = this.categories[index];
    this.content = this.selectedCategory;
    this.contentCopy = JSON.parse(JSON.stringify(this.selectedCategory));
  }
  search() {
    if (this.searchText.trim().length) {
      this.content = this.contentCopy.filter((content) => {
        return content.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
      });
    } else {
      this.content = JSON.parse(JSON.stringify(this.contentCopy));
    }
  }
  signOut() {
    localStorage.setItem('token', null);
    this.router.navigate(['login']);
  }
}
