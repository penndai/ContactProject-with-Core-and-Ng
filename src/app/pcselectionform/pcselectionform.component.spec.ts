import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionformComponent } from './pcselectionform.component';

describe('SelectionformComponent', () => {
  let component: SelectionformComponent;
  let fixture: ComponentFixture<SelectionformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
