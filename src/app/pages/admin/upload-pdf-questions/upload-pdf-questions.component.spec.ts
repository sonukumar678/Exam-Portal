import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPdfQuestionsComponent } from './upload-pdf-questions.component';

describe('UploadPdfQuestionsComponent', () => {
  let component: UploadPdfQuestionsComponent;
  let fixture: ComponentFixture<UploadPdfQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadPdfQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadPdfQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
