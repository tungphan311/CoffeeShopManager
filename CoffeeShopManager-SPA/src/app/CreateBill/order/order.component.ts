import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild('order') modal: ModalDirective;

  submitted = false;
  submitForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.submitForm = this.formBuilder.group({
      id: ['', Validators.required],
      payment: ['', Validators.required]
    });
  }

  get f() { return this.submitForm.controls; }

  show() {
    this.submitted = false;
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

  print() {
    this.submitted = true;

    if (this.submitForm.invalid) {
      return;
    }

    this.router.navigate(['/bill/invoice'], { state: { example: JSON.stringify(this.submitForm.value) }});
    this.submitForm.reset();
  }
}
