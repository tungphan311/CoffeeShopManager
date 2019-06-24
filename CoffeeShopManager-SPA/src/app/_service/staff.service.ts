import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Staff } from '../_models/Staff'
import { Team } from '../_models/Team';
import { TeamService } from './team.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const httpOptions = {
    headers: new HttpHeaders({
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  export class StaffService {
    baseUrl = environment.apiUrl;
    staff: any;
    //list 
    
    
  
    constructor(
      private http: HttpClient,
      private _teamService : TeamService,
      ) { }
  
    getStaffs(): Observable<Staff[]> {
      return this.http.get<Staff[]>(this.baseUrl + 'staff/',httpOptions);
    }
  
    getStaff(id): Observable<Staff> {
      return this.http.get<Staff>(this.baseUrl + 'staff/' +id,httpOptions);
    }
  }
  