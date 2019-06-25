import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../_service/Products/product.service';
import { AlertifyService } from '../../_service/alertify.service';
import { Products } from '../../_models/Products';
import { ProductDetail } from 'src/app/_models/ProductDetail';
import { ProductComponent } from '../product/product.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Order } from 'src/app/_models/Order';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  @ViewChild('product') product: ProductComponent;
  @ViewChild('productDetail') productDetail: ProductDetailComponent;

  products: Products[];
  orderList: Order[] = [];

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.orderList = [];
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products: Products[]) => {
      this.products = products;
    }, error => {
      this.alertify.error(error);
    });
  }

  show(id) {
    this.productDetail.show(id);
  }

  getOrder(order: Order) {
    this.orderList.push(order);
  }

  formatPrice(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  totalAmount(list) {
    let result = 0;
    list.forEach(element => {
      result += element.amount;
    });

    return result;
  }

  totalPrice(list) {
    let result = 0;
    list.forEach(element => {
      result += element.price;
    });

    return result;
  }
}
