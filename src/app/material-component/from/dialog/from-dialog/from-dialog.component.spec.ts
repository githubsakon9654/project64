import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromDialogComponent } from './from-dialog.component';

describe('FromDialogComponent', () => {
  let component: FromDialogComponent;
  let fixture: ComponentFixture<FromDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
