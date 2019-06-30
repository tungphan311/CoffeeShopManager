import { Component, OnInit } from '@angular/core';
import { Staff } from 'src/app/_models/Staff';
import { StaffService } from 'src/app/_service/staff.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {
  staff : Staff;
  galleryOptions: NgxGalleryOptions[]; 
  galleryImages : NgxGalleryImage[];
  constructor(
    private router: Router,
    private staffService: StaffService, 
    private alertify: AlertifyService, 
    private route : ActivatedRoute) { }

  ngOnInit() {
    var dateString = '';
    this.route.data.subscribe(data =>{
      this.staff = data['staff']; 
      this.defaultPhoto(this.staff);
    });
    console.log(this.staff);
    this.galleryOptions = [
      {
        width:'500px',
        height:'500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
    console.log(this.galleryImages);
  }

  loadDate(staff): string{
    var dateString = '';
    let date = new Date(this.staff.dateOfBirth);

    // console.log(this.staff.dateOfBirth);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    
    dateString = day +'/'+ month +'/' + year;
    return dateString;
  }

  getImages(){
    const imageUrls =[];
    for(let i=0;i<this.staff.photos.length;i++){
      imageUrls.push({
        small: this.staff.photos[i].url,
        medium: this.staff.photos[i].url,
        big: this.staff.photos[i].url,
        description: this.staff.photos[i].description
      })
    }
    return imageUrls;
  }
  deleteClick(){
    this.staff.isDelete = true;
    this.staffService.updateStaff(this.staff).subscribe(next => {
    this.alertify.success('Profile deleted successfully');
    this.router.navigate(['/staff']);
    },error =>{
      this.alertify.error(error);
    })
  }



  defaultPhoto(staff) : Staff {
    if(this.staff.photo==null||this.staff.photo=="")
      this.staff.photo = "https://makitweb.com/demo/broken_image/images/noimage.png";
    return staff;
  }

  loadStaff(){
    this.staffService.getStaff(this.route.snapshot.params['id']).subscribe((staff: Staff)=>{
      this.staff = staff;
      console.log('s'); 
    },error => {
      this.alertify.error(error);
    });
  }

}
