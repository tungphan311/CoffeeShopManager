import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  form: string;

  constructor(
    private router: Router
  ) {
    const navigaton = router.getCurrentNavigation();
    const state = navigaton.extras.state as { example: string };
    this.form = state.example;
    console.log(this.form);
  }

  ngOnInit() {
  }

}
