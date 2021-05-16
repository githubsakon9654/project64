import { TestBed } from '@angular/core/testing';

import { BudgetYearService } from './budget-year.service';

describe('BudgetYearService', () => {
  let service: BudgetYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
