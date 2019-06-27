import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../_service/Products/product.service';
import { AlertifyService } from '../../_service/alertify.service';
import { Products } from '../../_models/Products';
import { ProductDetail } from 'src/app/_models/ProductDetail';
import { ProductComponent } from '../product/product.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Order } from 'src/app/_models/Order';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  @ViewChild('product') product: ProductComponent;
  @ViewChild('productDetail') productDetail: ProductDetailComponent;
  @ViewChild('cart') cart: CartComponent;

  products: Products[];
  orderList: Order[] = [];
  buttons: boolean[] = [];

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.orderList = [];
    this.defaultButton();
    this.buttons[0] = true;
    this.loadProducts(this.buttons);
  }

  loadProducts(buttons: boolean[]) {
    buttons.forEach(id => {
      if (id === true) {
        this.productService.getProductByType(buttons.indexOf(id) + 1).subscribe((products: Products[]) => {
          this.products = products;
        }, error => {
          this.alertify.error(error);
        });
      }
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

  changeColor(event) {
    this.defaultButton();
    this.buttons[event] = true;
    this.loadProducts(this.buttons);
  }

  defaultButton() {
    this.buttons.fill(false);
  }
}
