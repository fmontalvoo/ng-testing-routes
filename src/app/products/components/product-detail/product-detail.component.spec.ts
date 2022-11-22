import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';

import { ProductDetailComponent } from './product-detail.component';
import { generateProduct } from 'src/app/data/product.mock';

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

    const productId = '1';
    route.setParamMap({ id: productId });

    const productMock = { ...generateProduct(), id: '1' };

    productService.getOne.and.returnValue(of(productMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
