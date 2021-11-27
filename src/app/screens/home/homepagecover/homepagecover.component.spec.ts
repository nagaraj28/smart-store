import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagecoverComponent } from './homepagecover.component';

describe('HomepagecoverComponent', () => {
  let component: HomepagecoverComponent;
  let fixture: ComponentFixture<HomepagecoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepagecoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
