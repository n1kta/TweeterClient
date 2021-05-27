import { TestBed } from '@angular/core/testing';

import { UnSavedFormDeactivateGuard } from './un-saved-form-deactivate.guard';

describe('UnSavedFormDeactivateGuard', () => {
  let guard: UnSavedFormDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnSavedFormDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
