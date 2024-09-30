import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [SidebarComponent, RouterModule], 
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.css'
})
export class OwnerHomeComponent {
  userName: string;

  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name;
  }
}