import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoryService } from '../../../services/category.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,JsonPipe,MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule,RouterOutlet,RouterModule,MatSlideToggleModule,MatSelectModule],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit{

constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService,private _router:Router){}

qId=0;
quiz:any;
categories:any;


  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qId).subscribe(
      (data)=>{
        this.quiz = data;
        console.log("quiz data : "+JSON.stringify(this.quiz));
      },
      (error)=>{
        console.log("Error in getting single quiz")+error;
      }
    );

    this._cat.categories().subscribe(
      (data)=>{
        this.categories=data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  public updateData(){
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        swal.fire('Success','Quiz Updated','success').then(
          (e)=>{
            this._router.navigate(['admin/quizzes']);
          }
        )
      },
      (error)=>{
        swal.fire('Error','Error in updating quiz','error');
      }
    )
   
  }

}
