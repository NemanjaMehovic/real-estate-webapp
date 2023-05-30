import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerAdvancedSearchComponent } from './buyer-advanced-search.component';

describe('BuyerAdvancedSearchComponent', () => {
  let component: BuyerAdvancedSearchComponent;
  let fixture: ComponentFixture<BuyerAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
