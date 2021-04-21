import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDurableComponent } from './insert-durable.component';

describe('InsertDurableComponent', () => {
  let component: InsertDurableComponent;
  let fixture: ComponentFixture<InsertDurableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertDurableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertDurableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
