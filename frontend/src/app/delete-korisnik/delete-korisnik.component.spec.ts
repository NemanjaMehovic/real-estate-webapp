import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteKorisnikComponent } from './delete-korisnik.component';

describe('DeleteKorisnikComponent', () => {
  let component: DeleteKorisnikComponent;
  let fixture: ComponentFixture<DeleteKorisnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteKorisnikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
