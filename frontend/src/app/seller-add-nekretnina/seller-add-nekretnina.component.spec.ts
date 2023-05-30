import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddNekretninaComponent } from './seller-add-nekretnina.component';

describe('SellerAddNekretninaComponent', () => {
  let component: SellerAddNekretninaComponent;
  let fixture: ComponentFixture<SellerAddNekretninaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerAddNekretninaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAddNekretninaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
