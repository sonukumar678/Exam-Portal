import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet, RouterModule, ActivatedRoute } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { QuestionService } from '../../../services/question.service';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-upload-pdf-questions',
  standalone: true,
  imports: [MatCardModule,
    MatListModule,
    MatIconModule,
    JsonPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterOutlet,
    RouterModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    CommonModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule
   ],

    providers: [MessageService],
  templateUrl: './upload-pdf-questions.component.html',
  styleUrl: './upload-pdf-questions.component.css'
})
export class UploadPdfQuestionsComponent implements OnInit{

  uploadedFiles: any[] = [];
  file: File | null = null; 
  qId:any;
  qTitle:any;
  question:any = {
    quiz : {},
  };

  constructor(private _ques:QuestionService,private _route:ActivatedRoute,private messageService: MessageService){}
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qid']= this.qId;
  }

    onUpload(event: any) {
      this.file = event.files[0];
      for(let f of event.files) {
        this.uploadedFiles.push(f);
    }
      const formData = new FormData();
      formData.append('quiz', JSON.stringify(this.question.quiz));
      if (this.file) {
        formData.append('file', this.file);
      }
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
        this._ques.upload(formData).subscribe(
          
          (data:any)=>{
           console.log("onupload:"+ JSON.stringify(data));
           
          },(response:any)=>{
            console.log("error11"+JSON.stringify(response));
           
          }
        )
      }

 /*   onFileRemove($event: Event) {
        throw new Error('Method not implemented.');
    }
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null; 
  qId:any;
  qTitle:any;
  question:any = {
    quiz : {},
    
  };
path: any;
dropElement: any;
  constructor(private _ques:QuestionService,private _route:ActivatedRoute){}
  ngOnInit(): void {
     this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qid']= this.qId;
  }

  onChange(event:any) { 
    this.file = event.target.files[0]; 
    console.log(this.file);
    if (this.file) {
      this.status = "initial";
      this.file = this.file;
    }
} 

// OnClick of button Upload 
onUpload() {

  const formData = new FormData();
  formData.append('quiz', JSON.stringify(this.question.quiz));
  if (this.file) {
    formData.append('file', this.file);
  }
  this.status = "uploading";
    this._ques.upload(formData).subscribe(
      
      (data:any)=>{
       console.log("onupload:"+ JSON.stringify(data));
       
      },(response:any)=>{
        console.log("error11"+JSON.stringify(response));
        this.status = "success";
      }
    )
  } */

  
}
