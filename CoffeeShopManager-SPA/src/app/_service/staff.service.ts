import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Staff } from '../_models/Staff';
import { Team } from '../_models/Team';
import { TeamService } from './team.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

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
    // list 
    
    
  
    constructor(
      private http: HttpClient,
      private _teamService : TeamService,
      ) { }
  
    getStaffs(page?, itemsPerPage?): Observable<PaginatedResult<Staff[]>> {
      const paginatedResult: PaginatedResult<Staff []> = new PaginatedResult<Staff[]>();

      let params = new HttpParams();

      if (page != null && itemsPerPage != null) {
        params = params.append('pageNumber', page);
        params = params.append('pageSize', itemsPerPage);

      }

      return this.http.get<Staff[]>(this.baseUrl + 'staff/', { observe: 'response', params})
        .pipe(
          map(response => {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
              paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
            }
            return paginatedResult;
          })
        );
    }
  
    getStaff(id): Observable<Staff> {
      return this.http.get<Staff>(this.baseUrl + 'staff/' + id);
    }
  }

