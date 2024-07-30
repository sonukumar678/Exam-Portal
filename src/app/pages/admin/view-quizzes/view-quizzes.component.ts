import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { title } from 'process';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';
import { error, info } from 'console';
import { RouterOutlet, RouterModule } from '@angular/router';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule,RouterOutlet,RouterModule,MatPaginatorModule],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit{

  constructor(private _quiz:QuizService){}

  quizzes = [{
    qid:"123",
    title:"This is title",
    description:"Descripyion",
    maxMarks:200,
    numberOfQuestions:50,
    category:{
      title:"cat title"
    }
  }];

  items: any[] = [];
  totalItems: number = 0;
  pageSize: number = 4;
  pageIndex: number = 0;


  ngOnInit(): void {
   this.getItems();

  }

  getItems():void{
    this._quiz.quizzes(this.pageIndex, this.pageSize).subscribe((data:any)=>{
      this.quizzes = data;
      console.log("quizzesss"+JSON.stringify(this.quizzes));
      this.items = data.content;
      this.totalItems = data.totalElements;
      
    },
  (error)=>{
    console.log("Error in Quizzes"+error);
    swal.fire('Error !!','Server Error','error');
  })
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
   this.getItems();
  }


  public deleteQuiz(qid:any){
   swal.fire({
    icon: 'info',
    title:'Are you sure ?',
    confirmButtonText:'Delete',
    showCancelButton:true
   }).then((result)=>{
    if(result.isConfirmed){
      this._quiz.deleteQuiz(qid).subscribe(
        (data)=>{
          this.quizzes = this.quizzes.filter((quiz)=>quiz.qid != qid);
          swal.fire('Success','Quiz Deleted','success');
        },
        (error)=>{
          swal.fire('Error','Error in deleting quiz','error');
        }
      )
    }
   })
  }

}
