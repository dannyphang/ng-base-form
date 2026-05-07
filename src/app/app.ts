import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BaseButtonComponent } from 'ng-base-lib';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BaseButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-base-form');
}
