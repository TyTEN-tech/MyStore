import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemDetail } from './product-item-detail';

describe('ProductItemDetail', () => {
  let component: ProductItemDetail;
  let fixture: ComponentFixture<ProductItemDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductItemDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
