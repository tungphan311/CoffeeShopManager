import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Products } from 'src/app/_models/Products';
import { ProductService } from 'src/app/_service/Products/product.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  @ViewChild('productDetail') modal: ModalDirective;

  saving = false;
  product: Products;

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  show(productId?: number | null | undefined) {
    this.saving = false;
    this.productService.getProduct(productId).subscribe((product: Products) => {
      this.product = product;
      this.modal.show();
    }, error => {
      this.alertify.error(error);
    });
  }

  close() {
    this.saving = false;
    this.modal.hide();
  }
}
