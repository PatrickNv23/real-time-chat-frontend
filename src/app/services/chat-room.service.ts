import { Injectable, inject } from '@angular/core';
import { SignalrClient, SignalrConnection } from 'ngx-signalr-websocket';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService {

  httpClient = inject(HttpClient);
  client!: SignalrClient;
  connection!: SignalrConnection;

  constructor() {
    this.client = SignalrClient.create(this.httpClient);
    this.client.connect("http://localhost:5178/chat").subscribe(connection => this.connection = connection)
  }

  sendMessage(user: string, message: string): Observable<any> {
    return this.connection.invoke('SendMessage', user, message);
  }

  getMessage(): Observable<[string, string]> {
    return this.connection.on<[string, string]>('ReceivedMessage')
  }
}
