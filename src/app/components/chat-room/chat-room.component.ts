import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { API_BASE_URL } from 'src/app/constants/constants';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  messages !: Array<{ user: string, description: string }>;
  private connection!: HubConnection;

  chatForm!: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);

  constructor() {
    this.messages = new Array<{ user: string, description: string }>();

    this.chatForm = this.formBuilder.group({
      user: new FormControl<string>(''),
      message: new FormControl<string>('')
    })

    this.connection = new HubConnectionBuilder().withUrl(`${API_BASE_URL}/chat`).build();

    this.connection.on('ReceivedMessageToGroup', (message: string) => this.receivedMessageToGroup(message))
  }

  joinGroup(groupName: string) {
    groupName && this.connection.invoke('JoinGroup', groupName);
  }

  ngOnInit(): void {
    this.connection.start()
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  sendMessageToGroup(message: string) {
    message && this.connection.invoke('SendMessageToGroup', 'Turritos', message)
  }


  receivedMessageToGroup(message: string) {
    this.messages.push({ user: 'User', description: message })
  }

}
