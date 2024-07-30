import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../admin/sidebar/sidebar.component';
import { SidebarUserComponent } from '../sidebar-user/sidebar-user.component';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [MatListModule, MatCardModule, SidebarComponent, RouterOutlet, SidebarUserComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
