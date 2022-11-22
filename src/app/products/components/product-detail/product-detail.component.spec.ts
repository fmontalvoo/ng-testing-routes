import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { of } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';

import { ProductDetailComponent } from './product-detail.component';

import { generateProduct } from 'src/app/data/product.mock';
import { asyncResolve, getText, ActivatedRouteStub } from 'src/testing';

fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  let route: ActivatedRouteStub;
  let location: jasmine.SpyObj<Location>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getOne']);

    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      providers: [
        { provide: Location, useValue: locationSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const productId = '1';
    route.setParamMap({ id: productId });

    const productMock = { ...generateProduct(), id: '1' };

    productService.getOne.and.returnValue(of(productMock));

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show the product on UI', () => {
    const productId = '1';
    route.setParamMap({ id: productId });

    const productMock = { ...generateProduct(), id: productId };

    productService.getOne.and.returnValue(of(productMock));

    fixture.detectChanges();

    const title = getText(fixture, 'title', true);
    const price = getText(fixture, 'price', true);
    const description = getText(fixture, 'description', true);

    expect(title).toEqual(productMock.title);
    expect(description).toEqual(productMock.description);
    expect(price).toContain(productMock.price.toString());

    expect(productService.getOne).withContext(`getOne(${productId}) should be called`).toHaveBeenCalledWith(productId);
  });

  it('should get the product and change the status from "loading" to "success"', fakeAsync(() => {
    const productId = '2';
    route.setParamMap({ id: productId });
    const productMock = { ...generateProduct(), id: productId };

    productService.getOne.and.returnValue(asyncResolve(productMock));

    fixture.detectChanges();

    expect(component.status).withContext('Status should be "loading"').toEqual('loading');

    tick();
    fixture.detectChanges();

    expect(component.status).withContext('Status should be "success"').toEqual('success');
    expect(productService.getOne).withContext(`getOne(${productId}) should be called`).toHaveBeenCalledWith(productId);
  }));

  it('should go back if there is no productId', () => {
    route.setParamMap({});
    spyOn(component, 'goToBack').and.callThrough();

    fixture.detectChanges();

    location.back.and.callThrough();

    expect(location.back).withContext('back() should be called').toHaveBeenCalled();
    expect(component.goToBack).withContext('goToBack() should be called').toHaveBeenCalled();
  });

  it('should typeCostumer be "customer"', () => {
    const productId = '3';
    const type = 'customer';
    route.setParamMap({ id: productId });
    route.setQueryParamMap({ type });

    const productMock = { ...generateProduct(), id: productId };
    productService.getOne.and.returnValue(of(productMock));

    fixture.detectChanges();

    expect(component.typeCostumer).toBe(type);

    const typeCostumer = getText(fixture, 'type', true);

    expect(typeCostumer).toBe(type);
  });
});
