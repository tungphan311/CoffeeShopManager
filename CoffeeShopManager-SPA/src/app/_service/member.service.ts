import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Member } from '../_models/Member';
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
  export class MemberService {
    baseUrl = environment.apiUrl;
    member: any;
    // list



    constructor(
      private http: HttpClient,
      // tslint:disable-next-line:variable-name
      private _teamService: TeamService,
      ) { }

    getMembers(page?, itemsPerPage?): Observable<PaginatedResult<Member[]>> {
      const paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

      let params = new HttpParams();

      if (page != null && itemsPerPage != null) {
        params = params.append('pageNumber', page);
        params = params.append('pageSize', itemsPerPage);
      }

      return this.http.get<Member[]>(this.baseUrl + 'member/', { observe: 'response', params})
        .pipe(
          map(response => {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
              paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }

            return paginatedResult;
          })
        );
    }

    getListMember(memberParams?): Observable<PaginatedResult<Member[]>> {
      const paginatedResult: PaginatedResult<Member []> = new PaginatedResult<Member[]>();

      let params = new HttpParams();


      if (memberParams.name !== '') {
        params = params.append('name', memberParams.name);
      }
      if (memberParams.phone !== '') {
        params = params.append('phone', memberParams.phone);
      }
      if (memberParams.address !== '') {
        params = params.append('address', memberParams.address);
      }
      if (memberParams.gender !== '') {
        params = params.append('gender', memberParams.gender);
      }
      if (memberParams.age !== '') {
        params = params.append('age', memberParams.age);
      }

      return this.http.get<Member[]>(this.baseUrl + 'member', { observe: 'response', params })
        .pipe(
          map(response => {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
              paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            console.log(paginatedResult);

            return paginatedResult;
          })
        );
    }
    getMember(id): Observable<Member> {
      return this.http.get<Member>(this.baseUrl + 'member/' + id);
    }
    updateMember(member: Member) {
      return this.http.put(this.baseUrl + 'member/' + member.id, member);
    }
    createMemberClick(): Observable<Member> {
      return this.http.get<Member>(this.baseUrl + 'member/' );
    }
    create(member: Member) {
      return this.http.post(this.baseUrl + 'member/create/', member);
    }
    setMainPhoto(memberId: number, id: number) {
      return this.http.post(this.baseUrl + 'member/' + memberId + '/photo/' + id + '/setMain', {});
    }

    getAllMembers(): Observable<Member[]> {
      return this.http.get<Member[]>(this.baseUrl + 'member/');
    }
  }

