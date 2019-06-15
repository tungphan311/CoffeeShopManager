/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MerberListComponent } from './merber-list.component';

describe('MerberListComponent', () => {
  let component: MerberListComponent;
  let fixture: ComponentFixture<MerberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
