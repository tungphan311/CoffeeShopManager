import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from 'src/app/_models/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseUrl + 'product/');
  }

  getProduct(id): Observable<Products> {
    return this.http.get<Products>(this.baseUrl + 'product/' + id);
  }
}
