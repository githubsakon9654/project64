import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurableRepairComponent } from './durable-repair.component';

describe('DurableRepairComponent', () => {
  let component: DurableRepairComponent;
  let fixture: ComponentFixture<DurableRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurableRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurableRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
