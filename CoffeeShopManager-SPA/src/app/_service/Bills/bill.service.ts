import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/_models/Bill';
import { PaginatedResult } from 'src/app/_models/Pagination';
import { Staff } from 'src/app/_models/Staff';
import { map } from 'rxjs/operators';
import { Response } from 'selenium-webdriver/http';
import { BillDetail } from 'src/app/_models/BillDetail';


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
    let paginatedResult: PaginatedResult<Bill []> = new PaginatedResult<Bill[]>();

    let params = new HttpParams();

    if (userParams != null) {

      if (userParams.year !== 0) {
        params = params.append('year', userParams.year);
      }
      if (userParams.month !== 0) {
        params = params.append('month', userParams.month);
      }
      if (userParams.day !== 0) {
        params = params.append('day', userParams.day);
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

  getTotal(userParams?): Observable<number> {
    let params = '';

    if (userParams != null) {

      if (userParams.year !== 0) {
        params += 'year=' + userParams.year;

        if (userParams.month !== 0) {
          params += '&month=' + userParams.month;
        }

        if (userParams.day !== 0) {
          params += '&day=' + userParams.day;
        }
      } else if (userParams.month !== 0) {
        params += '&month=' + userParams.month;

        if (userParams.day !== 0) {
          params += '&day=' + userParams.day;
        }
      } else if (userParams.day !==  0 ) {
        params += 'day=' + userParams.day;
      }

    }

    return this.http.get<number>(this.baseUrl + 'bill/total?' + params);
  }

  create(bill: Bill) {
    return this.http.post(this.baseUrl + 'bill/create', bill);
  }

  getBillDetail(id: number): Observable<BillDetail[]>  {
      // return this.http.get<BillDetail[]>(this.baseUrl + 'bill/bills', id)
     // return this.http.get<BillDetail[]>(this.baseUrl + 'bill/bills', id);
  return this.http.get<BillDetail[]>(this.baseUrl + 'bill/bills/' + id);
  };
}
