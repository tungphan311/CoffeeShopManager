import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Staff } from 'src/app/_models/Staff';
import { StaffService } from 'src/app/_service/staff.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/_service/team.service';
import { NgForm } from '@angular/forms';
import { Team } from 'src/app/_models/Team';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.css']
})
export class StaffCreateComponent implements OnInit {
  @ViewChild('createForm') createForm :NgForm;
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event: any){
    if(this.createForm.valid){
      $event.returnValue = true;
    }
  }
  team : Team;
  teams : Team[];
  model: any={};
  staff: Staff;
  staffGender = '';
  genderlist = ['Male','Female','Other'] ;


  constructor(
    private staffService: StaffService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private _teamService: TeamService) {}

  ngOnInit() {
    // this.defaultPhoto(this.staff);
    this._teamService.getTeams().subscribe(result => {
      this.teams = result;
      console.log(this.teams);
    });
    // console.log(this.teams);
  }

  defaultPhoto(staff): Staff{
    // this.staff.photo = "https://makitweb.com/demo/broken_image/images/noimage.png";
    // console.log(this.staff);
     return staff
  }
  getGender(input, output): boolean {
    if (input === output) {
      this.staffGender = output;
      return true;
    }

    return false;
  }

  createStaff(){
    this.staffService.create(this.model).subscribe(next => {
      this.alertify.success('Add empoyee successfully');
    this.createForm.reset(this.model);
    location.reload();
    },error =>{
      this.alertify.error(error);
    })
  }
}