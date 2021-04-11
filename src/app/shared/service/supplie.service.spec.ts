import { TestBed } from '@angular/core/testing';

import { SupplieService } from './supplie.service';

describe('SupplieService', () => {
  let service: SupplieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
