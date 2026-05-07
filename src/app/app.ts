import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { BaseButtonComponent, BaseCheckboxComponent, OptionsModel, BaseDropdownComponent, BaseInputComponent, BaseFormComponent, FormConfig, CONTROL_TYPE } from 'ng-base-lib';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BaseButtonComponent, BaseCheckboxComponent, BaseDropdownComponent, BaseInputComponent, BaseInputComponent, BaseFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-base-form');

  options: OptionsModel[] = [
    {
      label: 'Option 1',
      value: 'option1',
    },
    {
      label: 'Option 2',
      value: 'option2',
    },
    {
      label: 'Option 3',
      value: 'option3',
    },
  ];

  formConfig: FormConfig[] = [
    {
      label: 'username',
      type: CONTROL_TYPE.Textbox,
      layoutDefine: {
        column: 0,
        row: 0,
      },
    }
  ]

  constructor(
    private translate: TranslateService
  ) {

  }
}
