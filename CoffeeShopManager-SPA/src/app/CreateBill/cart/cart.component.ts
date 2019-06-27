import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { Order } from 'src/app/_models/Order';
import { ProductDetailService } from 'src/app/_service/ProductDetails/product-detail.service';
import { Products } from 'src/app/_models/Products';
import { ProductDetail } from 'src/app/_models/ProductDetail';
import { ProductService } from 'src/app/_service/Products/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() orders: Order[];
  @ViewChild('cart') modal: ModalDirective;

  saving = false;

  details: ProductDetail[] = [];
  products: Products[] = [];

  constructor(
    private router: Router,
    private detailService: ProductDetailService,
    private productService: ProductService
  ) {

   }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.orders.forEach(order => {
      this.detailService.getProductDetailById(order.productDetailId).subscribe((detail: ProductDetail) => {
        console.log(detail);
        this.details.push(detail);
        this.productService.getProduct(detail.productId).subscribe((product: Products) => {
          this.products.push(product);
          // console.log(product);
        });
      });
    });
  }

  show() {
    this.saving = false;
    this.getProduct();
    this.modal.show();
  }

  close() {
    this.saving = false;
    this.modal.hide();
  }

  increase(order) {
    order.amount += 1;
  }

  decrease(order) {
    order.amount -= 1;
  }

  delete(id) {
    this.orders = this.orders.filter(x => x.productDetailId !== id);
  }
}
