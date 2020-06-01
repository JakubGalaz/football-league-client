import { TestBed } from '@angular/core/testing';

import { MyPositionServiceService } from './my-position-service.service';

describe('MyPositionServiceService', () => {
  let service: MyPositionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPositionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
