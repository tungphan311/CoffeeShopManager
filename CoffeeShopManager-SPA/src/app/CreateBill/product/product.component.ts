import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../../_models/Products';
import { ProductService } from '../../_service/Products/product.service';
import { AlertifyService } from '../../_service/alertify.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  @Input() product: Products;

  constructor(

  ) { }

  ngOnInit() {

  }
}
