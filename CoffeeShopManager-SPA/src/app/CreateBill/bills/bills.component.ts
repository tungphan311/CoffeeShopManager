import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../_service/Products/product.service';
import { AlertifyService } from '../../_service/alertify.service';
import { Products } from '../../_models/Products';
import { ProductDetail } from 'src/app/_models/ProductDetail';
import { ProductComponent } from '../product/product.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Order } from 'src/app/_models/Order';
import { CartComponent } from '../cart/cart.component';
import { Router } from '@angular/router';

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

  submitted = false;
  id = '';
  paid = '';

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private router: Router
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
    let temp = 0;
    this.orderList.forEach(element => {
      if (element.productDetailId === order.productDetailId && order.note === '') {
        element.amount += order.amount;
        temp += 1;
      }
    });
    if (temp === 0) {
      this.orderList.push(order);
    }
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

  cartShow() {
    this.cart.show(this.orderList);
  }

  reloadList($event) {
    // console.log($event);
  }

  required(num): boolean {
    if (num === '') {
      return false;
    }

    return true;
  }

  isIdValid(num): boolean {
    if (isNaN(+num)) {
      return false;
    }

    // if (num % 1000 !== 0 || num < this.totalPrice) {
    //   return false;
    // }

    return true;
  }

  isPaidValid(num): boolean {
    if (isNaN(+num)) {
      return false;
    }

    if (num % 1000 !== 0 || Number(num) < this.totalPrice(this.orderList)) {
      return false;
    }

    return true;
  }

  isIdError(num): boolean {
    return this.required(num) && this.isIdValid(num);
  }

  isPaidError(num): boolean {
    return this.required(num) && this.isPaidValid(num);
  }

  printInvoice() {
    this.submitted = true;

    if (!this.isIdError(this.id) || !this.isPaidError(this.paid)) {
      return;
    }

    this.router.navigate(['/bill/invoice'],
      {
        state: {
          id: this.id,
          paid: this.paid,
          list: this.orderList
        }
      });
    this.id = this.paid = '';
  }
}
