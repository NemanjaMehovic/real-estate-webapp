import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMikrolokacijaComponent } from './add-mikrolokacija.component';

describe('AddMikrolokacijaComponent', () => {
  let component: AddMikrolokacijaComponent;
  let fixture: ComponentFixture<AddMikrolokacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMikrolokacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMikrolokacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
