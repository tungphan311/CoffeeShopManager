import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDetail } from 'src/app/_models/ProductDetail';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProductDetails(): Observable<ProductDetail[]> {
    return this.http.get<ProductDetail[]>(this.baseUrl + 'productdetail');
  }

  getProductDetail(id): Observable<ProductDetail[]> {
    return this.http.get<ProductDetail[]>(this.baseUrl + 'productdetail/' + id);
  }

  getProductDetailById(id): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(this.baseUrl + 'productdetail/id/' + id);
  }
}
