import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/_models/ProductType';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.baseUrl + 'producttype');
  }

  getProductType(id): Observable<ProductType> {
    return this.http.get<ProductType>(this.baseUrl + 'producttype/' + id);
  }
}
