import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bills } from 'src/app/_models/Bills';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getBills(): Observable<Bills[]> {
    return this.http.get<Bills[]>(this.baseUrl + 'product/');
  }

  getBill(id): Observable<Bills> {
    return this.http.get<Bills>(this.baseUrl + 'product/' + id);
  }
}
