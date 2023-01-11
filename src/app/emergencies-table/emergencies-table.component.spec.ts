import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenciesTableComponent } from './emergencies-table.component';

describe('EmergenciesTableComponent', () => {
  let component: EmergenciesTableComponent;
  let fixture: ComponentFixture<EmergenciesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergenciesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergenciesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
