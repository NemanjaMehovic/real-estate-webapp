import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUlicaComponent } from './delete-ulica.component';

describe('DeleteUlicaComponent', () => {
  let component: DeleteUlicaComponent;
  let fixture: ComponentFixture<DeleteUlicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUlicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUlicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
