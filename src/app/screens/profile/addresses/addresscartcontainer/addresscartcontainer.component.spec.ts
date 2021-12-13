import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresscartcontainerComponent } from './addresscartcontainer.component';

describe('AddresscartcontainerComponent', () => {
  let component: AddresscartcontainerComponent;
  let fixture: ComponentFixture<AddresscartcontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddresscartcontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresscartcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
