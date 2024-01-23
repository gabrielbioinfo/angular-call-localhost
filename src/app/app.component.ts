import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  template: `<h1>{{ title }}</h1>
    <hr />
    <h3>Fetch:</h3>
    <input
      type="url"
      class="form-control"
      [(ngModel)]="apiLocation"
      placeholder="http://localhost:3000"
    />
    <button (click)="getDataFromApi()">Buscar dados da API</button>
    <hr />
    <div style="border: 1px solid;padding: 3px;width:100%;min-height: 30px">
      {{ response() }}
    </div>
    <hr />
    <h3>Web Socket:</h3>
    <input
      type="url"
      class="form-control"
      [(ngModel)]="webSocketLocation"
      placeholder="http://localhost:3000"
    />
    <button (click)="initializeWebSocket()">Iniciar webSocket</button>
    <hr />
    <div style="border: 1px solid;padding: 3px;width:100%;min-height: 30px">
      {{ wsResponse() }}
    </div>`,
  styles: [],
})
export class AppComponent {
  title = 'angular-call-localhost';
  response = signal<string>('iniciando sem nada ainda...');
  wsResponse = signal<string>('');
  apiLocation = '';
  webSocketLocation = '';

  getDataFromApi() {
    //'http://localhost:3000/'
    fetch(this.apiLocation)
      .then((response) => response.text())
      .then((data) => this.response.set(data))
      .catch((err) =>
        this.response.set(
          `Servidor offline! Por favor ligue seu servidor em http://localhost:3000.`
        )
      );
    const socket = io(this.webSocketLocation);
    socket.on('connect', () => {
      this.response.set('Conectado ao servidor!');
    });
    socket.on('message', (data) => {
      this.response.set(data);
    });
    socket.on('disconnect', () => {
      this.response.set('Desconectado do servidor!');
    });
  }

  initializeWebSocket() {
    //'http://localhost:3000/'
    const socket = io(this.webSocketLocation);
    socket.on('connect', () => {
      this.response.set('Conectado ao servidor!');
    });
    socket.on('message', (data) => {
      this.response.set(data);
    });
    socket.on('disconnect', () => {
      this.response.set('Desconectado do servidor!');
    });
  }
}
