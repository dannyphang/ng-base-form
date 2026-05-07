import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBaseLib } from './ng-base-lib';

describe('NgBaseLib', () => {
  let component: NgBaseLib;
  let fixture: ComponentFixture<NgBaseLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgBaseLib],
    }).compileComponents();

    fixture = TestBed.createComponent(NgBaseLib);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
