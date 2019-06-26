import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/_models/Bill';
import { PaginatedResult } from 'src/app/_models/Pagination';
import { Staff } from 'src/app/_models/Staff';
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
export class BillService {
  bill: any;
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getBills(userParams?): Observable<PaginatedResult<Bill[]>> {
    const paginatedResult: PaginatedResult<Bill []> = new PaginatedResult<Bill[]>();

    let params = new HttpParams();

    if (userParams != null) {

      if (userParams.year !== 0)
      {
        params = params.append('year', userParams.year);
      }
      if (userParams.month !== 0)
      {
        params = params.append('month', userParams.month);
      }
      if (userParams.day !== 0)
      {
        params = params.append('day', userParams.day)
      }
    }

    return this.http.get<Bill[]>(this.baseUrl + 'bill/', { observe: 'response', params})
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

  getBill(id): Observable<Bill> {
    return this.http.get<Bill>(this.baseUrl + 'bill/' + id);
  }
}
