import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurableComponent } from './durable.component';

describe('DurableComponent', () => {
  let component: DurableComponent;
  let fixture: ComponentFixture<DurableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
