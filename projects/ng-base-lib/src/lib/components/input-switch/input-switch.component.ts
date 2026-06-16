import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseFieldControlComponent } from '../base-field-control/base-field-control';
import { ComponentImports } from '../component-import.module';

@Component({
  selector: 'app-base-switch',
  templateUrl: './input-switch.component.html',
  styleUrl: './input-switch.component.scss',
  imports: [ComponentImports],
})
export class BaseSwitchComponent extends BaseFieldControlComponent {
  @Input() content!: string;
  @Input() inline: boolean = false;
  @Input() descriptionMessage: string = '';

  @Output() switchUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  inputSwitchOnClick() {
    this.switchUpdate.emit();
  }
}
