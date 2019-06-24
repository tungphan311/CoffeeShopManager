import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Products } from '../../_models/Products';
import { ProductService } from '../../_service/Products/product.service';
import { AlertifyService } from '../../_service/alertify.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  @ViewChild('productDetail') productDetail: ProductDetailComponent;

  @Input() product: Products;

  constructor(

  ) { }

  ngOnInit() {

  }
}
