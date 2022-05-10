import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Config2Component } from './config2.component';

describe('Config2Component', () => {
  let component: Config2Component;
  let fixture: ComponentFixture<Config2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Config2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Config2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
