import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService {

  private connection!: HubConnection;
  constructor() {
    this.connection = new HubConnectionBuilder().withUrl(`http://localhost:5178/chat`).build();

    this.connection.on('ReceivedMessageToGroup', (message: string) => this.receivedMessageToGroup(message))


    this.connection.start()
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  sendMessageToGroup(groupName: string, message: string) {
    groupName && message && this.connection.invoke('SendMessageToGroup', groupName, message)
  }


  receivedMessageToGroup(message: string) {
  }

  joinGroup(groupName: string) {
    groupName && this.connection.invoke('JoinGroup', groupName);
  }
}
