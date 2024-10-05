import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSidebarComponent } from './banner-sidebar.component';

describe('BannerSidebarComponent', () => {
  let component: BannerSidebarComponent;
  let fixture: ComponentFixture<BannerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
