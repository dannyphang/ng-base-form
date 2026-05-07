import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: BaseCheckboxComponent;
  let fixture: ComponentFixture<BaseCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseCheckboxComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BaseCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
