import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import hexToBinary from 'hex-to-binary';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  url = 'http://183.90.168.77/api/newgffi/reportfidata';
  date = new Date();
  title = '';
  objectUrl: Blob;
  constructor(
    private http: HttpClient) { }


  ngOnInit() {
    const param = {
      COMP_CODE: "12005",
      ACC_DOC_NO: "0100000003",
      FISC_YEAR: "2562",
      FORMID: "J00"
    };

    return this.http.post(this.url, param, {responseType: 'text' as 'text'}).subscribe(value => {
      const text = value.split('<Data>')[1];
      const base64 = text.substring(0, text.indexOf('<'));
      const blob = this.base64ToPdfBlob(base64);
      this.objectUrl = blob;
    } , error => {
      console.log(error);
    });
  }

  base64ToPdfBlob(base64: string) {
    const byteArray = new Uint8Array(base64.length / 2);
    for (let x = 0; x < byteArray.length; x++) {
        byteArray[x] = parseInt(base64.substr(x * 2, 2), 16);
    }
    return new Blob([byteArray], {type: "application/pdf"});
  }
}
