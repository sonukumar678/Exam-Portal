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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-quiz',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,JsonPipe,MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule,RouterOutlet,RouterModule,MatSlideToggleModule,MatSelectModule,CommonModule],
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit{

  catId:any;
  quizzes:any;
  constructor(private _route: ActivatedRoute, private _quiz:QuizService){}

  ngOnInit(): void {

    this._route.params.subscribe(
      (params)=>{
        this.catId = params['catId'];
        if(this.catId == 0){
          this._quiz.getActiveQuizzzes().subscribe(
            (data)=>{
              this.quizzes = data;
              console.log("quizzes in loadQuizComp :"+JSON.stringify(data));
            },
            (error)=>{
              console.log(error);
            }
          );
        }else{
          console.log("Load specific quiz");
          this._quiz.getActiveQuizzzesOfCategory(this.catId).subscribe(
            (data:any)=>{
              this.quizzes = data;
              console.log("quiz length: "+this.quizzes.length);
            },
            (error:any)=>{
              console.log(error);
            }
          )
        }

      }
    )

  }

}
