import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAgencijaComponent } from './admin-add-agencija.component';

describe('AdminAddAgencijaComponent', () => {
  let component: AdminAddAgencijaComponent;
  let fixture: ComponentFixture<AdminAddAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddAgencijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
