import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealDialogComponent } from './reveal-dialog.component';

describe('RevealDialogComponent', () => {
  let component: RevealDialogComponent;
  let fixture: ComponentFixture<RevealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevealDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
