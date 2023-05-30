import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMikrolokacijaComponent } from './delete-mikrolokacija.component';

describe('DeleteMikrolokacijaComponent', () => {
  let component: DeleteMikrolokacijaComponent;
  let fixture: ComponentFixture<DeleteMikrolokacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMikrolokacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMikrolokacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
