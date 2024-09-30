import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-owner-details',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './owner-details.component.html',
  styleUrl: './owner-details.component.css'
})
export class OwnerDetailsComponent {

}
