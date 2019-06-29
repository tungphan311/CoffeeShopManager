import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
// import { stat } from 'fs';
import { Order } from 'src/app/_models/Order';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {
  id: number;
  paid: number;
  orders: Order[] = [];

  constructor(
    private router: Router
  ) {
    const navigaton = router.getCurrentNavigation();
    const state = navigaton.extras.state;

    this.id = state.id;
    this.paid = state.paid;
    this.orders = state.list;
  }

  ngOnInit() {
  }

}
