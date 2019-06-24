import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_service/Products/product.service';
import { AlertifyService } from '../../_service/alertify.service';
import { Products } from '../../_models/Products';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  products: Products[];

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products: Products[]) => {
      this.products = products;
    }, error => {
      this.alertify.error(error);
    });
  }
}
