import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlimitedPhotoCollageComponent } from './collage.component';

describe('UnlimitedPhotoCollageComponent', () => {
  let component: UnlimitedPhotoCollageComponent;
  let fixture: ComponentFixture<UnlimitedPhotoCollageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlimitedPhotoCollageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlimitedPhotoCollageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
