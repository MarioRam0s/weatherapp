import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidemenu } from './presentation/shared/sidemenu/sidemenu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidemenu],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('weatherapp');
}
