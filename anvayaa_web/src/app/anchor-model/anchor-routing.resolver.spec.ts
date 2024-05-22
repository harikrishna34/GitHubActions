import { TestBed } from '@angular/core/testing';

import { AnchorRoutingResolver } from './anchor-routing.resolver';

describe('AnchorRoutingResolver', () => {
  let resolver: AnchorRoutingResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AnchorRoutingResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
