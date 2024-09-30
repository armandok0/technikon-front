import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { OwnerService } from '../services/owner.service';
import { Repair } from '../models/repair.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-repairs',
  standalone: true,
  imports: [SidebarComponent, RouterModule, CommonModule],
  templateUrl: './owner-repairs.component.html',
  styleUrls: ['./owner-repairs.component.css']
})
export class OwnerRepairsComponent implements OnInit {
  repairs: Repair[] = [];
  userVAT: string;

  constructor(private ownerService: OwnerService) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userVAT = user.vat;
  }

  ngOnInit(): void {
    if (this.userVAT) {
      this.ownerService.getRepairsByOwner(this.userVAT).subscribe({
        next: (repairs) => this.repairs = repairs,
        error: (error) => console.error('Error fetching repairs', error)
      });
    }
  }
}
