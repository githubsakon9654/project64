import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListhistoryComponent } from './listhistory.component';

describe('ListhistoryComponent', () => {
  let component: ListhistoryComponent;
  let fixture: ComponentFixture<ListhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
