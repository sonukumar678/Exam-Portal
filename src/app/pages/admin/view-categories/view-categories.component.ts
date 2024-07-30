import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';
import {MatDividerModule} from '@angular/material/divider';
import { NgFor } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,MatDividerModule,NgFor,MatButtonModule,RouterOutlet,RouterModule],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit{
  constructor(private _category:CategoryService){}

  categories:any[] = [];

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories = data;
      console.log("categories: "+JSON.stringify(this.categories));
    },
  (error)=>{
    console.log("Error in categories"+error);
  })
  }
}
