import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  name = '';
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  async add() {
    try {
      let create = await this.http.post(`${environment.baseUrl}/api/category/create`, { name: this.name }).toPromise();
      console.log({ create });
    } catch (e) {
      console.log({ e });
    }
  }
}
