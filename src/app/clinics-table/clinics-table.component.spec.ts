import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsTableComponent } from './clinics-table.component';

describe('ClinicsTableComponent', () => {
  let component: ClinicsTableComponent;
  let fixture: ComponentFixture<ClinicsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
