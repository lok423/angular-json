import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingJsonComponent } from './loading-json.component';

describe('LoadingJsonComponent', () => {
  let component: LoadingJsonComponent;
  let fixture: ComponentFixture<LoadingJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
