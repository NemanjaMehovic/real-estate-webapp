import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddJsonComponent } from './seller-add-json.component';

describe('SellerAddJsonComponent', () => {
  let component: SellerAddJsonComponent;
  let fixture: ComponentFixture<SellerAddJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerAddJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAddJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
