import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('cart') modal: ModalDirective;

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.modal.show();
  }
}
