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
import swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,JsonPipe,MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule,RouterOutlet,RouterModule,MatSlideToggleModule,MatSelectModule],
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit{

  constructor(private _route:ActivatedRoute, private _question:QuestionService,private _snak:MatSnackBar){}
  qId:any;
  qTitle:any;
  questions:any = [];

  ngOnInit(): void {
   this.qId = this._route.snapshot.params['qid'];
   this.qTitle = this._route.snapshot.params['title'];
   this._question.getQuestionsOdQuiz(this.qId).subscribe(
    (data)=>{
      this.questions = data;
      console.log(this.questions);
    },
    (error)=>{
      console.log(error);
    }
   )
  }

  public deleteQuestion(qId:any){
    swal.fire({
      icon: 'info',
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
      iconColor:'accent'
  }).then(
    (result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qId).subscribe(
          (data)=>{
            this.questions = this.questions.filter((q:any)=>q.qid != qId);
            this._snak.open('Question Deleted','Ok',{
              duration:1000,
            });
            
          },
          (error)=>{
            this._snak.open('Internal Server Error','Ok',{
              duration:1000,
            });
          }
        )
      }
    }
  )
  }
}

