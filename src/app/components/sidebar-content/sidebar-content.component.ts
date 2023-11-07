import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css']
})
export class SidebarContentComponent {

  selectedSidebarItem !: string;
  sidebarService = inject(SidebarService)

  constructor() {
    this.sidebarService.getSelectedSidebarItem().subscribe({
      next: (response: string) => {
        this.selectedSidebarItem = response;
      }
    })
  }
}
