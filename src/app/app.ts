import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { BaseButtonComponent, BaseCheckboxComponent, OptionsModel, BaseDropdownComponent, BaseInputComponent, BaseFormComponent, FormConfig, CONTROL_TYPE, ToastService, ToastComponent, BreadcrumbComponent, ChipComponent, BaseSwitchComponent } from 'ng-base-lib';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [BaseSwitchComponent, BaseFormComponent, ToastComponent, BreadcrumbComponent, ChipComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-base-form');

  items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: '/'
    },
    {
      label: 'Form',
      routerLink: '/form'
    }
  ];
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
        colSpan: 6
      },
      prefix: 'U',
      iconLabelTooltip: 'testing',
      autoFocus: true
    },
    {
      label: 'gender',
      type: CONTROL_TYPE.Dropdown,
      layoutDefine: {
        column: 1,
        row: 0,
        colSpan: 6
      },
      options: this.options,
      iconLabelTooltip: 'testing'
    },
    {
      label: 'checkbox',
      type: CONTROL_TYPE.Checkbox,
      layoutDefine: {
        column: 0,
        row: 1,
        colSpan: 6
      },
      options: this.options
    },
    {
      label: 'label',
      type: CONTROL_TYPE.Label,
      layoutDefine: {
        column: 1,
        row: 1,
        colSpan: 6
      },
    },
    {
      label: 'button',
      type: CONTROL_TYPE.Button,
      layoutDefine: {
        column: 0,
        row: 2,
        colSpan: 6
      },
      onClickFunc: () => {
        this.toastService.addSingle({
          message: "BUTTON.CLICK",
          severity: "success",
          // sticky: true
        })
      }
    },
    {
      label: 'radio',
      type: CONTROL_TYPE.Radio,
      layoutDefine: {
        column: 1,
        row: 2,
        colSpan: 6
      },
      options: this.options
    },
    {
      label: 'textarea',
      type: CONTROL_TYPE.Textarea,
      layoutDefine: {
        column: 0,
        row: 3,
        colSpan: 6
      },
    },
    {
      label: 'date',
      type: CONTROL_TYPE.Calendar,
      layoutDefine: {
        column: 1,
        row: 3,
        colSpan: 6
      },
    },
    {
      label: 'date multiple',
      type: CONTROL_TYPE.Calendar,
      layoutDefine: {
        column: 0,
        row: 4,
        colSpan: 6
      },
      mode: 'range' // TODO: will shows format invalid format message
    },
    {
      label: 'chips',
      type: CONTROL_TYPE.Textbox,
      layoutDefine: {
        column: 1,
        row: 4,
        colSpan: 6
      },
      mode: 'chips'
    },
    {
      label: 'number',
      type: CONTROL_TYPE.Textbox,
      layoutDefine: {
        column: 0,
        row: 5,
        colSpan: 6
      },
      mode: 'number',
      suffix: "kg"
    },
    {
      label: 'switch',
      type: CONTROL_TYPE.Switch,
      layoutDefine: {
        column: 1,
        row: 5,
        colSpan: 6
      },
      inline: true
    }
  ]

  constructor(
    private translate: TranslateService,
    private toastService: ToastService,
  ) {

  }
}
