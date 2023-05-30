import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateNekretninaComponent } from './seller-update-nekretnina.component';

describe('SellerUpdateNekretninaComponent', () => {
  let component: SellerUpdateNekretninaComponent;
  let fixture: ComponentFixture<SellerUpdateNekretninaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerUpdateNekretninaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerUpdateNekretninaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
