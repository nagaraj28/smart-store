import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedbrandsComponent } from './featuredbrands.component';

describe('FeaturedbrandsComponent', () => {
  let component: FeaturedbrandsComponent;
  let fixture: ComponentFixture<FeaturedbrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedbrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
