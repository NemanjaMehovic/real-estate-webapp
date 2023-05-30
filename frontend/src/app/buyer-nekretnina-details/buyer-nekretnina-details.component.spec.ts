import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerNekretninaDetailsComponent } from './buyer-nekretnina-details.component';

describe('BuyerNekretninaDetailsComponent', () => {
  let component: BuyerNekretninaDetailsComponent;
  let fixture: ComponentFixture<BuyerNekretninaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerNekretninaDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerNekretninaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
