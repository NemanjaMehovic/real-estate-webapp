import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateInfoComponent } from './seller-update-info.component';

describe('SellerUpdateInfoComponent', () => {
  let component: SellerUpdateInfoComponent;
  let fixture: ComponentFixture<SellerUpdateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerUpdateInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerUpdateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
