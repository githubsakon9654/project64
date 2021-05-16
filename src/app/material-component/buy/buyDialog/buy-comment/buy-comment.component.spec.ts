import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCommentComponent } from './buy-comment.component';

describe('BuyCommentComponent', () => {
  let component: BuyCommentComponent;
  let fixture: ComponentFixture<BuyCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
