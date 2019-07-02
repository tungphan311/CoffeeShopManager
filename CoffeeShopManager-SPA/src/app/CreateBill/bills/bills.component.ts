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
import { Bill } from 'src/app/_models/Bill';
import { BillDetail } from 'src/app/_models/BillDetail';
import { BillService } from 'src/app/_service/Bills/bill.service';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/_service/auth.service';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_service/member.service';

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
  focus = false;
  key = 0;
  value = '';
  members =   [];

  bill: any = {};

  submitted = false;
  id = '';
  paid = '';

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private router: Router,
    private billService: BillService,
    private authService: AuthService,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.orderList = [];
    this.defaultButton();
    this.buttons[0] = true;
    this.bill.billDetails = [];
    this.loadProducts(this.buttons);
    this.loadMembers();
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

  loadMembers() {
    this.memberService.getAllMembers().subscribe(result => {
      this.members = result;
      console.log(result);
    });
  }

  show(id) {
    this.productDetail.show(id);
  }

  getOrder(order: Order) {
    let temp = 0;
    this.orderList = this.orderList.filter(x => x.amount > 0);
    this.orderList.forEach(element => {
      if (element.productDetailId === order.productDetailId && order.note === '') {
        element.amount += order.amount;
        element.price += order.price;
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

    const today = new Date();
    let jstoday = '';
    jstoday = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0700');
    this.bill.memberId = 1;
    this.bill.staffId = this.authService.decodedToken.given_name;
    this.bill.value = this.totalPrice(this.orderList);
    this.bill.createddate = today;

    this.orderList.forEach(order => {
      const detail: BillDetail = {
        productDetailId: order.productDetailId,
        amount: order.amount
      };

      this.bill.billDetails.push(detail);
    });

    this.billService.create(this.bill).subscribe(result => {
      this.alertify.success('Thêm hoá đơn thành công');
    }, error => {
      this.alertify.error(error);
    });

    if (this.key > 0) {
      this.memberService.getMember(this.key).subscribe((member: Member) => {
        member.point += Math.round(this.totalPrice(this.orderList) / 10000);

        this.memberService.updateMember(member).subscribe(result => {
          this.alertify.success('Tích điểm thành công');
        }, error => {
          this.alertify.error(error);
        });
      });
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

  setQuery(item) {
    this.value = item.name;
    this.key = item.id;
    console.log(this.key);
    this.focus = false;
  }
}
