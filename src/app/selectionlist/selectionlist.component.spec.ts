import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionlistComponent } from './selectionlist.component';

describe('SelectionlistComponent', () => {
  let component: SelectionlistComponent;
  let fixture: ComponentFixture<SelectionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
