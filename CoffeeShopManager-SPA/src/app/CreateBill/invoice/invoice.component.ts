import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
// import { stat } from 'fs';
import { Order } from 'src/app/_models/Order';
import { aggregateBy } from '@progress/kendo-data-query';
import { InvoiceRow } from './invoice-row';
import { or } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { ProductDetailService } from 'src/app/_service/ProductDetails/product-detail.service';
import { ProductService } from 'src/app/_service/Products/product.service';
import { Products } from 'src/app/_models/Products';
import { ProductDetail } from 'src/app/_models/ProductDetail';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {
  id: number;
  paid: number;
  orders: Order[] = [];
  data: InvoiceRow[] = [];

  aggregates: any[] = [{
    field: 'qty', aggregate: 'sum'
  }, {
    field: 'total', aggregate: 'sum'
  }];

  constructor(
    private router: Router,
    private detailService: ProductDetailService,
    private productService: ProductService
  ) {
    const navigaton = router.getCurrentNavigation();
    const state = navigaton.extras.state;

    this.id = state.id;
    this.paid = state.paid;
    this.orders = state.list;

    this.orders.forEach(order => {
      this.detailService.getProductDetailById(order.productDetailId).subscribe((detail: ProductDetail) => {
        this.productService.getProduct(detail.productId).subscribe((product: Products) => {
          const row: InvoiceRow = {
            productName: product.name,
            unitPrice: detail.price,
            qty: order.amount,
            total: order.amount * detail.price
          };
          this.data.push(row);
        });
      });
    });
  }

  ngOnInit() {
  }

  public get totals(): any {
    return aggregateBy(this.data, this.aggregates) || {};
  }
}
