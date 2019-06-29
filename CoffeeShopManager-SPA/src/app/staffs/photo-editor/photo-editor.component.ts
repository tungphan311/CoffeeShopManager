import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Staff } from 'src/app/_models/Staff';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input()photos : Photo[];
  @Input()staff : Staff;
  uploader:FileUploader; 
  hasBaseDropZoneOver = false;
  baseUrl = environment;

  constructor() { }

  ngOnInit() {
    // console.log(this.staff);
    this.initializeUploader();
    console.log(this.uploader);
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  
  initializeUploader() {
    this.uploader = new FileUploader({
      url: 'http://localhost:5000/api/staff/'+ this.staff.id +'/photo',
      isHTML5:true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    })
    this.uploader.onAfterAddingFile = (file) =>{file.withCredentials = false;}; 
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }

}
