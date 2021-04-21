import { TestBed } from '@angular/core/testing';

import { DurableService } from './durable.service';

describe('DurableService', () => {
  let service: DurableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DurableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
