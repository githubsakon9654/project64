import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOfferComponent } from './unit-offer.component';

describe('UnitOfferComponent', () => {
  let component: UnitOfferComponent;
  let fixture: ComponentFixture<UnitOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
