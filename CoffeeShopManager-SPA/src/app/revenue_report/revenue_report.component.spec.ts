/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Revenue_reportComponent } from './revenue_report.component';

describe('Revenue_reportComponent', () => {
  let component: Revenue_reportComponent;
  let fixture: ComponentFixture<Revenue_reportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Revenue_reportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Revenue_reportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
