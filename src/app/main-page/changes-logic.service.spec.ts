import { TestBed } from '@angular/core/testing';

import { ChangesLogicService } from './changes-logic.service';

describe('ChangesLogicService', () => {
  let service: ChangesLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangesLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
