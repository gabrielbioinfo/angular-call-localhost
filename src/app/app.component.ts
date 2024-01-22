import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<h1>{{ title }}</h1>
    <hr />
    {{ response() }}`,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-call-localhost';
  response = signal<string>('iniciando sem nada ainda...');

  ngOnInit() {
    fetch('http://localhost:3000/')
      .then((response) => response.text())
      .then((data) => this.response.set(data))
      .catch((err) => this.response.set(err));
  }
}
