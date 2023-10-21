import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomService } from 'src/app/services/chat-room.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {

  messages !: Array<{ user: string, description: string }>;
  chatRommService: ChatRoomService = inject(ChatRoomService);
  chatForm!: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);

  constructor() {
    this.messages = new Array<{ user: string, description: string }>();

    this.chatForm = this.formBuilder.group({
      user: new FormControl<string>(''),
      message: new FormControl<string>('')
    })
  }

  sendMessage(user: string, message: string) {
    this.chatRommService.sendMessage(user, message).subscribe((response: any) => console.log(response));
    this.chatRommService.getMessage().subscribe(([user, message]: [string, string]) => {
      this.messages.push({ user, description: message });
    });
    this.chatForm.reset();
  }

}
