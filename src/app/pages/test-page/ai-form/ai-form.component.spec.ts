import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiFormComponent } from './ai-form.component';

describe('AiFormComponent', () => {
  let component: AiFormComponent;
  let fixture: ComponentFixture<AiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
