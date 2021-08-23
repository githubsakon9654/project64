import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuReportComponent } from './du-report.component';

describe('DuReportComponent', () => {
  let component: DuReportComponent;
  let fixture: ComponentFixture<DuReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
