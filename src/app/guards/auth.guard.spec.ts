import { Router } from "@angular/router";
import { TestBed } from "@angular/core/testing";

import { of } from "rxjs";

import { AuthGuard } from "./auth.guard";

import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";

import { generateUser } from "../data/user.mock";
import { fakeActivatedRouteSnapshot, fakeParamMap, fakeRouterStateSnapshot } from "src/testing";

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  let tokenService: TokenService;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        TokenService,
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ]
    });

    authGuard = TestBed.inject(AuthGuard);

    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('Should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should be true with an active user session', (doneFn) => {
    const route = fakeActivatedRouteSnapshot({
      params: { productId: '1' },
      paramMap: fakeParamMap({ type: 'customer' }),
    });
    const state = fakeRouterStateSnapshot({});

    const mockUser = generateUser();
    authService.getUser.and.returnValue(of(mockUser))

    authGuard.canActivate(route, state)
      .subscribe(res => {
        expect(res).toBeTrue();
        doneFn();
      });
  });

  it('should be false without a user session', (doneFn) => {
    const route = fakeActivatedRouteSnapshot({
      params: { productId: '2' },
      paramMap: fakeParamMap({ type: 'customer' }),
    });
    const state = fakeRouterStateSnapshot({});

    authService.getUser.and.returnValue(of(null))

    authGuard.canActivate(route, state)
      .subscribe(res => {
        expect(res).toBeFalse();
        expect(router.navigate).toHaveBeenCalledOnceWith(['/']);
        doneFn();
      });
  });
});
