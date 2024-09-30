import { Component } from '@angular/core';
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-owner-properties',
  standalone: true,
  imports: [SidebarComponent, RouterModule],
  templateUrl: './owner-properties.component.html',
  styleUrl: './owner-properties.component.css'
})
export class OwnerPropertiesComponent {

}
