import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealDetailComponent } from './reveal-detail.component';

describe('RevealDetailComponent', () => {
  let component: RevealDetailComponent;
  let fixture: ComponentFixture<RevealDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevealDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
