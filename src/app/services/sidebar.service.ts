import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {

  private selectedSidebarItem = new BehaviorSubject<string>('CHATS');

  setSelectedSidebarItem(sidebarItem: string) {
    this.selectedSidebarItem.next(sidebarItem)
  }

  getSelectedSidebarItem() {
    return this.selectedSidebarItem.asObservable();
  }

}
