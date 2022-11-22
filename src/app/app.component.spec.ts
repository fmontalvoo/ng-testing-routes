import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { queryAllByDirective, RouterLinkDirectiveStub } from 'src/testing';

@Component({
  selector: 'app-banner'
})
class BannerComponentStub { }

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        BannerComponentStub,
        RouterLinkDirectiveStub,
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora los componentes que no estan incluidos en las declaraciones.
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-testing-routes'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng-testing-routes');
  });

  it('should be 7 routerLink directives', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);

    expect(links.length).toEqual(7);
  });

  it('should be 7 routerLink directives with match routes', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLinks: RouterLinkDirectiveStub[] = links.map(link => link.injector.get(RouterLinkDirectiveStub));
    const paths = [
      '/',
      '/auth/login',
      '/auth/register',
      '/people',
      '/products',
      '/preview',
      '/others'
    ];

    expect(links.length).toEqual(7);

    routerLinks.forEach((link, i) => {
      expect(link.linkParams).toEqual(paths[i]);
    });
  });
});
