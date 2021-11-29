import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistingcontainerComponent } from './productlistingcontainer.component';

describe('ProductlistingcontainerComponent', () => {
  let component: ProductlistingcontainerComponent;
  let fixture: ComponentFixture<ProductlistingcontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductlistingcontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlistingcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
