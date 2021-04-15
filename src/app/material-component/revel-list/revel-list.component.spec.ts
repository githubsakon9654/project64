import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevelListComponent } from './revel-list.component';

describe('RevelListComponent', () => {
  let component: RevelListComponent;
  let fixture: ComponentFixture<RevelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
