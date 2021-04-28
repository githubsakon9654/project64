import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurableOwnComponent } from './durable-own.component';

describe('DurableOwnComponent', () => {
  let component: DurableOwnComponent;
  let fixture: ComponentFixture<DurableOwnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurableOwnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurableOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
