import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionsOdQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`)
  }

  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

 public upload(formData:any) { 
    return this._http.post(`${baseUrl}/upload-file/`, formData);
} 
}
