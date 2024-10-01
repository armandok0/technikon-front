import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { Property } from '../../../models/property.model'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-properties',
  standalone: true,
  imports: [SidebarComponent, RouterModule, CommonModule],
  templateUrl: './owner-properties.component.html',
  styleUrls: ['./owner-properties.component.css'] 
})
export class OwnerPropertiesComponent implements OnInit {
  properties: Property[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getPropertiesByOwner().subscribe({
      next: (properties) => this.properties = properties,
      error: (error) => console.error('Error fetching properties', error)
    });
  }
}