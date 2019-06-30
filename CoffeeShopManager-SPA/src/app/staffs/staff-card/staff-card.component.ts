import { Component, OnInit, Input } from '@angular/core';
import { Staff } from 'src/app/_models/Staff';
import { TeamService } from 'src/app/_service/team.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { StaffService } from 'src/app/_service/staff.service';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.css']
})
export class StaffCardComponent implements OnInit {
  @Input() staff: Staff;
  teamlist = [];
  

  // tslint:disable-next-line:typedef-whitespace
  // tslint:disable-next-line:variable-name
  constructor(
    private staffService: StaffService, 
    private alertify: AlertifyService, 
    private route : ActivatedRoute,
    private _teamService: TeamService) { }
  getTeams(): void {
    this._teamService.getTeams().subscribe(result => {
      this.teamlist = result;
    } );
  }
  getStaffTeamName(id: number): any {
    for (const iterator of this.teamlist) {
      if (iterator.id === id) {
          return iterator.name;
      }
   }
  }
  reload(){
    location.reload();
  }
  deleteClick(){
    this.staff.isDelete = true;
    this.staffService.updateStaff(this.staff).subscribe(next => {
    this.alertify.success('Profile deleted successfully');
    this.reload();
    },error =>{
      this.alertify.error(error);
    })
  }
  defaultPhoto():void {

  }
  ngOnInit() {
    this.getTeams();
  }

}
