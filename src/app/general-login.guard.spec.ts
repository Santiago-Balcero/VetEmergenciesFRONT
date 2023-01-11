import { TestBed } from '@angular/core/testing';

import { GeneralLoginGuard } from './general-login.guard';

describe('GeneralLoginGuard', () => {
  let guard: GeneralLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GeneralLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
