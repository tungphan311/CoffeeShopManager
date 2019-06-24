import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';
import { Team } from '../_models/Team';
import { idLocale } from 'ngx-bootstrap';
const httpOptions = {
  headers: new HttpHeaders({
    // tslint:disable-next-line:object-literal-key-quotes
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  baseUrl = environment.apiUrl;
  staff: any;

  constructor(private http: HttpClient) { }
  getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.baseUrl + 'team/',httpOptions);
  }

  getTeam(id): Observable<Team>{
    return this.http.get<Team>(this.baseUrl + 'team/'+id, httpOptions);
  }

}
