import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerGraphsComponent } from './seller-graphs.component';

describe('SellerGraphsComponent', () => {
  let component: SellerGraphsComponent;
  let fixture: ComponentFixture<SellerGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
