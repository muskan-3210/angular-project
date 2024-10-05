import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerNavbarComponent } from './banner-navbar.component';

describe('BannerNavbarComponent', () => {
  let component: BannerNavbarComponent;
  let fixture: ComponentFixture<BannerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
