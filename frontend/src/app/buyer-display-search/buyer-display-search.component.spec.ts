import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDisplaySearchComponent } from './buyer-display-search.component';

describe('BuyerDisplaySearchComponent', () => {
  let component: BuyerDisplaySearchComponent;
  let fixture: ComponentFixture<BuyerDisplaySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerDisplaySearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDisplaySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
