import { TestBed } from '@angular/core/testing';

import { ClientLoginGuard } from './client-login.guard';

describe('ClientLoginGuard', () => {
  let guard: ClientLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClientLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
