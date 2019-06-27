import { Component, OnInit, Input } from '@angular/core';
import { Staff } from 'src/app/_models/Staff';
import { TeamService } from 'src/app/_service/team.service';

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
  constructor(private _teamService: TeamService) { }
  getTeams(): void {
    this._teamService.getTeams().subscribe(result => {
      this.teamlist = result;
      console.log(this.teamlist);
    } );
  }
  getStaffTeamName(id: number): any {
    for (const iterator of this.teamlist) {
      if (iterator.id === id) {
          return iterator.name;
      }
  }
  }
  ngOnInit() {
    this.getTeams();
  }

}
