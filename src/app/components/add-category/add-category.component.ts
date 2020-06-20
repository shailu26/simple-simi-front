import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  name = '';
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {}

  async add() {
    try {
      if (this.name.length) {
        const create = await this.http
          .post(`${environment.baseUrl}/api/category/create`, { name: this.name })
          .toPromise();
        console.log({ create });
        this.toastr.success('Category Added Successfully');
      }
    } catch (e) {
      console.log({ e });
      this.toastr.error('Something went wrong, Check server is up and running');
    }
  }
}
