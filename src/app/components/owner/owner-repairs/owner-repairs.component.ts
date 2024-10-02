import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { RepairService } from '../../../services/repair.service';
import { Repair } from '../../../models/repair.model';
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

  private ownerService = inject(RepairService);

  ngOnInit(): void {
    this.ownerService.getRepairsByOwner().subscribe({
      next: (repairs) => this.repairs = repairs,
      error: (error) => console.error('Error fetching repairs', error)
    });
  }
}