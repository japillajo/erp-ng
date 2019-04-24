import { TestBed } from '@angular/core/testing';

import { ArrayUtilService } from './array-util.service';

describe('ArrayUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrayUtilService = TestBed.get(ArrayUtilService);
    expect(service).toBeTruthy();
  });
});
