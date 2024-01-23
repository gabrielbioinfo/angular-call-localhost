import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<h1>{{ title }}</h1>
    <hr />
    <h3>Fetch:</h3>
    <div style="border: 1px solid;padding: 3px;width:100%">
      {{ response() }}
    </div>
    <hr />
    <h3>Web Socket:</h3>
    <div style="border: 1px solid;padding: 3px;width:100%">
      {{ wsResponse() }}
    </div>`,
  styles: [],
})
export class AppComponent {
  title = 'angular-call-localhost';
  response = signal<string>('iniciando sem nada ainda...');
  wsResponse = signal<string>('');

  ngOnInit() {
    fetch('http://localhost:3000/')
      .then((response) => response.text())
      .then((data) => this.response.set(data))
      .catch((err) =>
        this.response.set(
          'Servidor offline! Por favor ligue seu servidor em http://localhost:3000.'
        )
      );
    const socket = io('http://localhost:3000');
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
