import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css'],
})
export class AddContentComponent implements OnInit {
  file: any;
  name: any;
  categories: any = [];
  selectedValue: any = null;
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.getUserDetails();
  }
  async getUserDetails() {
    let user: any = await this.http.get(`${environment.baseUrl}/api/user/getCurrentUser`).toPromise();
    console.log({ user });

    this.categories = user.userDetails[0].category;
    if (this.categories.length) {
      this.selectedValue = this.categories[0]._id;
    }
  }

  uploadToS3(url, data, type) {
    const headers = new HttpHeaders({
      'Content-Type': type,
      'x-amz-acl': 'public-read',
      'Access-Control-Allow-Origin': '*',
    });
    const req = new HttpRequest('PUT', url, data, {
      headers,
    });

    return new Promise((resolve, reject) => {
      this.http.request(req).subscribe((res: any) => {
        if (res.url) {
          resolve(res);
        }
      });
    });
  }

  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.file = myReader.result;
      console.log(this.file);
    };
    myReader.readAsDataURL(file);
    console.log(this.selectedValue);
  }
  async add() {
    if (this.name && this.selectedValue && this.file) {
      const type = this.file.substring('data:image/'.length, this.file.indexOf(';base64'));
      console.log({ type });
      try {
        let url = await this.http
          .post(`${environment.baseUrl}/api/user/getPresignedUrl`, {
            bucketName: 'vhire',
            folderName: 'abc',
            files: [{ contentType: type }],
          })
          .toPromise();
        console.log(url);
        const fileData: any = await this.urltoFile(this.file, url[0].fileName, type);
        const s3: any = await this.uploadToS3(url[0].url, fileData, type);
        console.log({ s3 });
        const updated: any = await this.http
          .post(`${environment.baseUrl}/api/content/create`, {
            name: this.name,
            category: this.selectedValue,
            fileLink: s3.url,
          })
          .toPromise();
        this.toastr.success('Content Added Successfully');
      } catch (e) {
        console.log({ e });
        this.toastr.error('Something went wrong');
      }
    }
  }

  urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, {
          type: mimeType,
        });
      });
  }
  onChange(value) {
    console.log(value);
    this.selectedValue = value;
  }
}
