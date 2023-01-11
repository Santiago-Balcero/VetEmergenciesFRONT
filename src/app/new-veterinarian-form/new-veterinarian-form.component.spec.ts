import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVeterinarianFormComponent } from './new-veterinarian-form.component';

describe('NewVeterinarianFormComponent', () => {
  let component: NewVeterinarianFormComponent;
  let fixture: ComponentFixture<NewVeterinarianFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVeterinarianFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVeterinarianFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
