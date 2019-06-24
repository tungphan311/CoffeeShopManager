import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
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
  @Input() product: Products;
  @Output() select: EventEmitter<number> = new EventEmitter<number>();

  constructor(

  ) { }

  ngOnInit() {

  }

  add(id) {
    this.select.emit(id);
  }
}
