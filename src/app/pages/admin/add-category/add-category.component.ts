import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import { JsonPipe, NgFor } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { title } from 'process';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [MatDividerModule,MatCardModule,MatListModule,MatIconModule,MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule,JsonPipe],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  constructor(private _category:CategoryService,private _snake:MatSnackBar){}
  category = {
    title : '',
    description: ''
  };

  public submitCategory(){
    if(this.category.title.trim() == '' || this.category.title == null){
      this._snake.open('Title required !!','Ok',{
        duration:3000,
      })
      return;
    }
    //submit
    this._category.addCategory(this.category).subscribe((data:any)=>{
      swal.fire('Success done !!','','success');
      this.category.title='';
      this.category.description='';
    },
  (error)=>{
    console.log("Error in submitCategory method");
    swal.fire('Error !!','Server Error','error');
  })
  }
}
