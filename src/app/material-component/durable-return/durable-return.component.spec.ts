import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurableReturnComponent } from './durable-return.component';

describe('DurableReturnComponent', () => {
  let component: DurableReturnComponent;
  let fixture: ComponentFixture<DurableReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurableReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurableReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
