import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { SidebarContentComponent } from 'src/app/components/sidebar-content/sidebar-content.component';
import { ChatRoomComponent } from 'src/app/components/chat-room/chat-room.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, SidebarContentComponent, ChatRoomComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
