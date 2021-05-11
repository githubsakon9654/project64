import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertRepairComponent } from './insert-repair.component';

describe('InsertRepairComponent', () => {
  let component: InsertRepairComponent;
  let fixture: ComponentFixture<InsertRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
