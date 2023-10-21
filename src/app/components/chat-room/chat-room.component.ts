import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ChatRoomService } from 'src/app/services/chat-room.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

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
  //chatRommService: ChatRoomService = inject(ChatRoomService);
  chatForm!: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);

  constructor() {
    this.messages = new Array<{ user: string, description: string }>();

    this.chatForm = this.formBuilder.group({
      user: new FormControl<string>(''),
      message: new FormControl<string>('')
    })

    this.connection = new HubConnectionBuilder().withUrl('http://localhost:5178/chat').build();

    this.connection.on('ReceivedMessage', (user: string, message: string) => this.receivedMessage(user, message))
  }
  ngOnInit(): void {
    this.connection.start()
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }


  sendMessage(user: string, message: string) {

    /*
    this.chatRommService.sendMessage(user, message).subscribe(response => console.log(response));
    this.chatRommService.getMessage().subscribe(([user, message]: [string, string]) => {
      this.messages.push({ user, description: message });
    });*/


    user && message && this.connection.invoke('SendMessage', user, message)

  }

  private receivedMessage(user: string, message: string) {
    this.messages.push({ user, description: message })
  }

}
