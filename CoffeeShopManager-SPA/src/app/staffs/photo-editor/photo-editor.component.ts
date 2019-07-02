import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Staff } from 'src/app/_models/Staff';
import { StaffService } from 'src/app/_service/staff.service';
import { AlertifyService } from 'src/app/_service/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input()photos: Photo[];
  @Input()staff: Staff;
  @Output() getStaffPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment;
  currentMain: Photo;

  constructor(
    private staffService: StaffService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    // console.log(this.staff);
    this.initializeUploader();
    console.log(this.uploader);
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }



  initializeUploader() {
    this.uploader = new FileUploader({
      url: 'http://localhost:5000/api/staff/' + this.staff.id + '/photo',
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
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
        if(this.staff.photo ==="https://makitweb.com/demo/broken_image/images/noimage.png") this.staff.photo = photo.url;
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.staffService.setMainPhoto(this.staff.id, photo.id).subscribe(() => {
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      // if(this.staff.photo ==="https://makitweb.com/demo/broken_image/images/noimage.png") this.staff.photo = photo.url;
      this.getStaffPhotoChange.emit(photo.url);
    }, error => {
      this.alertify.error(error);
    });
  }

}
