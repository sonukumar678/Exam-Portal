import { JsonPipe } from '@angular/common';
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
import { QuestionService } from '../../../services/question.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor } from 'ckeditor5';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,JsonPipe,MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule,RouterOutlet,RouterModule,MatSlideToggleModule,MatSelectModule,CKEditorModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{

  constructor(private _route:ActivatedRoute, private _ques:QuestionService){}
  public Editor = ClassicEditor;
  qId:any;
  qTitle:any;

  question:any = {
    quiz : {},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  };

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qid']= this.qId;
  }

  submitQuestion(){
    if(this.question.content.trim() == null || this.question.content == ''){
      return;
    }
    if(this.question.option1.trim() == null || this.question.option1 == ''){
      return;
    }
    if(this.question.option2.trim() == null || this.question.option2 == ''){
      return;
    }
    if(this.question.option3.trim() == null || this.question.option3 == ''){
      return;
    }
    if(this.question.option4.trim() == null || this.question.option4 == ''){
      return;
    }

    this._ques.addQuestion(this.question).subscribe(
      (data:any)=>{
        //console.log("add Question data: "+JSON.stringify(data));
        Swal.fire('Success !!','Question Added Successfully','success');
        this.question.content='',
        this.question.option1='',
        this.question.option2='',
        this.question.option3='',
        this.question.option4=''
      },
      (error)=>{
        console.log("Question error: "+JSON.stringify(error));
        Swal.fire('Error !!','Internal Server Error','error');
      }
    )
  }

}
