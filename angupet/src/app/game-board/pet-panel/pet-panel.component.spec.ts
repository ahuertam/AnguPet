import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPanelComponent } from './pet-panel.component';

describe('PetPanelComponent', () => {
  let component: PetPanelComponent;
  let fixture: ComponentFixture<PetPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
