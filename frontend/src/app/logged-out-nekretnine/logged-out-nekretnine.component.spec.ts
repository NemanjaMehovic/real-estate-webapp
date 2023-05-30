import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutNekretnineComponent } from './logged-out-nekretnine.component';

describe('LoggedOutNekretnineComponent', () => {
  let component: LoggedOutNekretnineComponent;
  let fixture: ComponentFixture<LoggedOutNekretnineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedOutNekretnineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedOutNekretnineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
