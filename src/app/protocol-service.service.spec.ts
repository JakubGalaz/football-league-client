import { TestBed } from '@angular/core/testing';

import { ProtocolServiceService } from './protocol-service.service';

describe('ProtocolServiceService', () => {
  let service: ProtocolServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtocolServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
