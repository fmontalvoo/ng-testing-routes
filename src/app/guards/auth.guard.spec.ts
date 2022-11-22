import { Router } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AuthGuard } from "./auth.guard";

import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";

fdescribe('AuthGuard', () => {
  let authGuard: AuthGuard;

  let tokenService: TokenService;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['user$']);

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
});
