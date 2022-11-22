import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";

import { AppModule } from "./app.module";
import { routes } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { ProductService } from "./services/product.service";

import { generateProducts } from "./data/product.mock";
import { asyncResolve, clickElement, getText, query, queryAllByDirective } from "src/testing";

fdescribe('App integration test', () => {
  let router: Router;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora los componentes que no estan incluidos en las declaraciones.
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    router = TestBed.inject(Router);
    router.initialNavigation();

    tick(); // Espera miestras termina de hacer la navegacion cuando hay un cambio de ruta.
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should be 7 routerLink directives', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(7);
  });

  it('should perform the navigation to /others when click on the link.', fakeAsync(() => {
    const productsMock = generateProducts(10);
    productService.getAll.and.returnValue(asyncResolve(productsMock));

    clickElement(fixture, 'others-link', true);

    tick(); // Espera miestras termina de hacer la navegacion cuando hay un cambio de ruta.
    fixture.detectChanges(); // ngOnInit -> OthersComponent

    expect(router.url).toEqual('/others');
    const element = query(fixture, 'app-others');
    expect(element).not.toBeNull();

    tick(); // Realiza la peticion al servicio de productos
    fixture.detectChanges(); // Muestra los cambios en la interfaz de usuario.

    const result = getText(fixture, 'total-products', true);
    expect(result).toContain(productsMock.length.toString());
  }));

  it('should perform the navigation to /preview when click on the link.', fakeAsync(() => {
    clickElement(fixture, 'preview-link', true);

    tick(); // Espera miestras termina de hacer la navegacion cuando hay un cambio de ruta.
    fixture.detectChanges(); // ngOnInit -> PreviewComponent

    expect(router.url).toEqual('/preview');
    const element = query(fixture, 'app-preview');
    expect(element).toBeTruthy();
  }));

  // it('',()=>{});
});
