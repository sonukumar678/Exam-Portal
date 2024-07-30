import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'app-sidebar-user',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,RouterOutlet,RouterModule],
  templateUrl: './sidebar-user.component.html',
  styleUrl: './sidebar-user.component.css'
})
export class SidebarUserComponent implements OnInit{

  catgories:any;
  constructor(private _cat:CategoryService, private _snake:MatSnackBar){}
  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data)=>{
        this.catgories = data;
      },
      (error)=>{
        this._snake.open('Error in loading categories', '',{
          duration:3000
        })
      }
    )
  }

}
