import { TestBed } from '@angular/core/testing';

import { ReposListService } from './repos-list.service';

describe('ReposListService', () => {
  let service: ReposListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReposListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
