import { Router } from "@angular/router";
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";

import { AppComponent } from "./app.component";

@Component({
  selector: 'app-people'
})
class PeopleComponent { }

@Component({
  selector: 'app-preview'
})
class PreviewComponent { }

@Component({
  selector: 'app-others'
})
class OthersComponent { }

const routes = [
  {
    path: 'people',
    component: PeopleComponent
  },
  {
    path: 'preview',
    component: PreviewComponent
  },
  {
    path: 'others',
    component: OthersComponent
  }
];

fdescribe('App integration test', () => {
  let router: Router;

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent,
        PeopleComponent,
        OthersComponent,
        PreviewComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora los componentes que no estan incluidos en las declaraciones.
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    router.initialNavigation();

    tick(); // Espera miestras termina de hacer la navegacion.
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
