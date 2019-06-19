/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Product_reportComponent } from './product_report.component';

describe('Product_reportComponent', () => {
  let component: Product_reportComponent;
  let fixture: ComponentFixture<Product_reportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product_reportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product_reportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
