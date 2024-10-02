import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { Property } from '../../../models/property.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [SidebarComponent, RouterModule, CommonModule], 
  templateUrl: './owner-home.component.html',
  styleUrls: ['./owner-home.component.css']
})
export class OwnerHomeComponent implements OnInit {
  userName: string;
  latestProperty: Property | null = null; 
  mapUrl: SafeResourceUrl | null = null;

  private propertyService = inject(PropertyService);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name;
  }

  ngOnInit(): void {
    this.fetchLatestProperty();
  }

  fetchLatestProperty(): void {
    this.propertyService.getLatestProperty().subscribe({
      next: (property) => {
        this.latestProperty = property; 
        if (property && property.propertyAddress) {
          this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.google.com/maps/embed/v1/place?key=AIzaSyApBxXUmShQCgKwTGP6EMuCt6TUBmhzMWk&q=${property.propertyAddress}`
          );
        }
      },
      error: (error) => console.error('Error fetching latest property', error)
    });
  }
}