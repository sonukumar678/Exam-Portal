import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet, RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { title } from 'process';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,JsonPipe,MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule,RouterOutlet,RouterModule,MatSlideToggleModule,MatSelectModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{
category: any;

  constructor(private _category:CategoryService, private _snake:MatSnackBar,private _quizService:QuizService){}
 
  categories = [{
    cid:"1",
    title:"Programing"
  }];

  quizData = {
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category: {
      cid:''
    }

  };

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories = data;
      //console.log(this.categories);
    },
  (error)=>{
    //console.log(error);
    Swal.fire('Error !!','Error in loading category from server','error');
  })
  }

  //add quiz method
  public addQuiz(){
    if(this.quizData.title == '' || this.quizData.title == null){
      this._snake.open('Title required !!','ok',{
        duration: 3000,
      })
      return;
    }

    //validation sever call
    this._quizService.addQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Success','Quiz is added','success');
        this.quizData.title='';
        this.quizData.description='';
        this.quizData.maxMarks='';
        this.quizData.numberOfQuestions='';
        this.quizData.category.cid='';
        this.quizData.active=false;
      },
      (error)=>{
        Swal.fire('Error','Server Error','error');
      }
    )

  }
}
