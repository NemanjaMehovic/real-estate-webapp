import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUlicaComponent } from './add-ulica.component';

describe('AddUlicaComponent', () => {
  let component: AddUlicaComponent;
  let fixture: ComponentFixture<AddUlicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUlicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUlicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
