import { TestBed } from '@angular/core/testing';

import { RepairServiceService } from './repair-service.service';

describe('RepairServiceService', () => {
  let service: RepairServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
