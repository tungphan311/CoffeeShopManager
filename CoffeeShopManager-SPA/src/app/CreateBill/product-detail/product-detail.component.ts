import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Products } from 'src/app/_models/Products';
import { ProductService } from 'src/app/_service/Products/product.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { ProductTypeService } from 'src/app/_service/ProductTypes/product-type.service';
import { ProductType } from 'src/app/_models/ProductType';
import { ProductDetail } from 'src/app/_models/ProductDetail';
import { ProductDetailService } from 'src/app/_service/ProductDetails/product-detail.service';
import { Order } from 'src/app/_models/Order';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  @ViewChild('productDetail') modal: ModalDirective;
  @Output() order: EventEmitter<Order> = new EventEmitter<Order>();

  saving = false;
  product: Products;
  type: ProductType;
  size: string;
  details: ProductDetail[] = [];
  select: any;
  amount = 1;
  note = '';
  a: number;

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private typeService: ProductTypeService,
    private detailService: ProductDetailService
  ) { }

  ngOnInit() {

  }

  show(productId?: number | null | undefined) {
    this.saving = false;
    this.productService.getProduct(productId).subscribe((product: Products) => {
      this.product = product;

      // get type of product
      this.typeService.getProductType(product.typeId).subscribe((type: ProductType) => {
        this.type = type;
      }, error => {
        this.alertify.error(error);
      });

      // get list detail of product
      this.detailService.getProductDetail(product.id).subscribe((detail: ProductDetail[]) => {
        this.details = detail;
        this.select = detail[0];
      }, error => {
        this.alertify.error(error);
      });

      this.modal.show();
    }, error => {
      this.alertify.error(error);
    });
  }

  close() {
    this.saving = false;
    this.modal.hide();
  }

  save() {
    const output: Order = {
      productDetailId: this.select.id,
      name: this.product.name,
      size: this.sizeName(this.select.size),
      amount: this.amount,
      price: this.amount * this.select.price,
      note: this.note
    };

    this.order.emit(output);
    this.alertify.success('Thêm món thành công');
    this.saving = true;
    this.amount = 1;
    this.note = '';
    this.close();
  }

  sizeName(size): string {
    if (size === 'S') {
      return 'Nhỏ';
    }
    // tslint:disable-next-line:one-line
    else if (size === 'M') {
      return 'Vừa';
    }
    // tslint:disable-next-line:one-line
    else if (size === 'L') {
      return 'Lớn';
    }
  }

  formatPrice(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  checkboxEvent(detail) {
    if (this.select === detail) {
      return false;
    }
    // tslint:disable-next-line:one-line
    else {
      this.select = detail;
    }
  }

  increase() {
    this.amount += 1;
  }

  decrease() {
    this.amount -= 1;
  }

  totalPrice(): number {
    return this.amount * this.select.price;
  }
}
