import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  id: number;
  paid: number;

  constructor(
    private router: Router
  ) {
    const navigaton = router.getCurrentNavigation();
    const state = navigaton.extras.state as { example: string };
    const stringtify = JSON.parse(state.example);
    console.log(stringtify);
    this.id = stringtify.id;
    this.paid = stringtify.payment;

    console.log(this.id);
    console.log(this.paid);
  }

  ngOnInit() {
  }

}
