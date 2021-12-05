import { TestBed } from '@angular/core/testing';

import { CartlistService } from './cartlist.service';

describe('CartlistService', () => {
  let service: CartlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
